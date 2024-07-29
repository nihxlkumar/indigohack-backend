import express from "express";
import models from "../models/index.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const data = await models.Flights.findAll({
      attributes: [
        "id",
        "flight_no",
        "airline",
        "status",
        "departure_gate",
        "arrival_gate",
        "scheduled_departure",
        "scheduled_arrival",
        "actual_departure",
        "actual_arrival",
      ],
    });
    return res.status(200).json({ data, message: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await models.Flights.findOne({
      where: {
        id,
      },
      attributes: [
        "id",
        "flight_no",
        "airline",
        "status",
        "departure_gate",
        "arrival_gate",
        "scheduled_departure",
        "scheduled_arrival",
        "actual_departure",
        "actual_arrival",
      ],
    });
    return res.status(200).send({ data, message: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
