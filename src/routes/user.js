import express from "express";
import jwt from "jsonwebtoken";
import ActiveNotifications from "../models/active-notifications.js";

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
          active: !prevNotification.active,
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
      await ActiveNotifications.create({
        flight_id,
        user_id: user.id,
        active: true,
        method
      });
    }

    return res.json({
      data: prevNotification ? !prevNotification.active : true,
      message: prevNotification
        ? "Notification update successfully"
        : "Added for notification successfullly",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
