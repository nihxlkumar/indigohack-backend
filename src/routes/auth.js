import express from "express";
import models from "../models/index.js";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

const router = express.Router();
const JWT_SECRET = process.env.NODE_SALT_JWT_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
        },
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      token,
      email: user.email,
      name: user.name,
      message: "Logged In successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const userExists = await models.Users.findOne({ where: { email } });
    if (userExists) {
      return res.json({ message: "User with this email already exists" });
    }

    const user = await models.Users.create({ name, phone, email, password });

    const token = jwt.sign(
      {
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
        },
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res
      .status(200)
      .json({
        token,
        email: user.email,
        name: user.name,
        message: "User Created successfully",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
