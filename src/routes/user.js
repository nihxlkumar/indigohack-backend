import express from "express";
import jwt from "jsonwebtoken";
import ActiveNotifications from "../models/active-notifications.js";
import { NotificationType } from "../config/constants.js";
import User from "../models/users.js";

const router = express.Router();
const JWT_SECRET = process.env.NODE_SALT_JWT_SECRET;

router.put("/add-or-remove-notification", async (req, res) => {
  try {
    const { token, flight_id, method } = req.body;
    let user;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      user = decoded.user;
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const prevNotification = await ActiveNotifications.findOne({
      where: {
        flight_id,
        user_id: user.id,
      },
    });

    if (prevNotification) {
      await ActiveNotifications.update(
        {
          active:
            method === NotificationType.none ? false : !prevNotification.active,
          method,
        },
        {
          where: {
            flight_id,
            user_id: user.id,
          },
        }
      );
    } else {
      if (method !== NotificationType.none) {
        await ActiveNotifications.create({
          flight_id,
          user_id: user.id,
          active: true,
          method,
        });
      }
    }

    return res.json({
      data:
        method === NotificationType.none
          ? false
          : prevNotification
          ? !prevNotification.active
          : true,
      message: prevNotification
        ? "Notification update successfully"
        : "Added for notification successfullly",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/add-device-token", async (req, res) => {
  try {
    const { token, device_token } = req.body;
    let user;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      user = decoded.user;
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const isUser = await User.findOne({
      where: {
        id: user.id,
      },
      attributes: ["id"],
    });

    if (!isUser) {
      return res.status(401).json({ message: "User Not found" });
    }

    await User.update({ device_token }, { where: { id: user.id } });
    
    return res.json({
      data: true,
      message: "Added user device token",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
