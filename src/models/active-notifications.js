import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Flights from "./flights.js";

const ActiveNotifications = sequelize.define(
  "ActiveNotifications",
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "active_notifications",
  }
);

export default ActiveNotifications;
