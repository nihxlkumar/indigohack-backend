import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./users.js";

const Notifications = sequelize.define(
  "Notifications",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seen: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    status: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    reason: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "notifications",
  }
);


export default Notifications;
