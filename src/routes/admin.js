import express from "express";
import models from "../models/index.js";
import jwt from "jsonwebtoken";
import { FlightStatus, NotificationStatus } from "../config/constants.js";

const router = express.Router();
const JWT_SECRET = process.env.NODE_SALT_JWT_SECRET;

const sendNotifications = async (id, message) => {
  const records = await models.ActiveNotifications.findAll({
    where: {
      flight_id: id,
      active: true,
    },
  });

  if (records) {
    const data = [];
    for (const record of records) {
      const obj = {
        flight_id: id,
        message,
        method: record.method,
        user_id: record.user_id,
        seen: false,
        status: NotificationStatus.pending,
        reason: null,
      };
      data.push(obj);
    }

    await models.Notifications.bulkCreate(data);
  }
};

const buildMessage = (data) => {
  const message1 = `Your flight ${data.flight_no} ${
    data.status === FlightStatus.cancelled ? "has been" : "is"
  } ${data.status}.`;
  const message2 =
    data.status === FlightStatus.delayed
      ? `New departure time: ${data.scheduled_departure}.`
      : "";
  const message3 =
    data.status === FlightStatus.cancelled
      ? ""
      : `Departure gate: ${data.departure_gate}.`;
  return `${message1} ${data.status === FlightStatus.delayed ? message2 : ""} ${
    data.status === FlightStatus.cancelled ? "" : message3
  }`;
};

router.post("/add-flight", async (req, res) => {
  try {
    const body = req.body;
    const token = body.token;
    let user;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      user = decoded.user;
    } catch (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    if (user.email !== "admin@indigowithme.com") {
      return res.status(401).json({ message: "Not Admin" });
    }

    delete body.token;

    await models.Flights.create(body);

    return res.status(200).json({ message: "Flight added sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update-flight", async (req, res) => {
  try {
    const body = req.body;
    const token = body.token;
    let user;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      user = decoded.user;
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (user.email !== "admin@indigowithme.com") {
      return res.status(401).json({ message: "Not Admin" });
    }

    delete body.token;

    const prevFlightDetails = await models.Flights.findOne({
      where: {
        id: body.id,
      },
    });

    if (!prevFlightDetails) {
      return res.status(401).json({ message: "Flight not found" });
    }

    const id = body.id;
    delete body.id;
    await models.Flights.update(body, {
      where: {
        id,
      },
    });

    const message = buildMessage(body);
    sendNotifications(id, message);

    return res.status(200).json({ message: "Flight updated sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
