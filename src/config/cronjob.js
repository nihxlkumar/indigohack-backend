import { CronJob } from "cron";
import models from "../models/index.js";
import { NotificationStatus, NotificationType } from "./constants.js";
import sendEmail from "../services/email.js";
import sendSMS from "../services/sms.js";
import User from "../models/users.js";
import Notification from "../models/notifications.js";
import admin from "firebase-admin";
import serviceAccount from "./firebasServiceAccount.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async (deviceToken, notificationMessage) => {
  const message = {
    token: deviceToken,
    notification: {
      title: "Flight Update",
      body: notificationMessage,
    },
    data: {},
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      throw new Error(error.message);
    });
};

const task = async () => {
  console.log("Running a task every minute");
  const notifications = await Notification.findAll({
    where: {
      status: NotificationStatus.pending,
    },
    raw: true,
    nest: true,
  });

  if (notifications.length) {
    for (const notification of notifications) {
      const user = await User.findOne({
        where: { id: notification.user_id },
        attributes: ["name", "phone", "email", "device_token"],
      });
      await models.Notifications.update(
        { status: NotificationStatus.inprogress },
        { where: { id: notification.id } }
      );
      if (notification.method === NotificationType.email) {
        await sendEmail(user.email, "Flight Status", notification.message)
          .then(async (res) => {
            console.log("Email sent");
            await models.Notifications.update(
              { status: NotificationStatus.sent },
              { where: { id: notification.id } }
            );
          })
          .catch(async (err) => {
            console.error("Error sending email:", err);
            await models.Notifications.update(
              { status: NotificationStatus.failed, reason: err.message },
              { where: { id: notification.id } }
            );
          });
      } else if (notification.method === NotificationType.text) {
        await sendSMS(`+91${user.phone}`, notification.message)
          .then(async (res) => {
            console.log("SMS sent");
            await models.Notifications.update(
              { status: NotificationStatus.sent },
              { where: { id: notification.id } }
            );
          })
          .catch(async (err) => {
            console.error("Error sending SMS:", err);
            await models.Notifications.update(
              { status: NotificationStatus.failed, reason: err.message },
              { where: { id: notification.id } }
            );
          });
      } else if (notification.method === NotificationType.app) {
        if (user.device_token) {
          await sendPushNotification(user.device_token, notification.message)
            .then(async (res) => {
              console.log("Push notification sent");
              await models.Notifications.update(
                { status: NotificationStatus.sent },
                { where: { id: notification.id } }
              );
            })
            .catch(async (err) => {
              console.error("Error sending push :", err);
              await models.Notifications.update(
                {
                  status: NotificationStatus.failed,
                  reason: err.message,
                },
                { where: { id: notification.id } }
              );
            });
        } else {
          await models.Notifications.update(
            {
              status: NotificationStatus.failed,
              reason: "user device token not found",
            },
            { where: { id: notification.id } }
          );
        }
      }
    }
  }
};

const startCronJob = new CronJob(
  "* * * * *",
  task,
  null,
  false,
  "Asia/Kolkata"
);

export default startCronJob;
