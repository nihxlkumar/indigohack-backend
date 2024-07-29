import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Flights = sequelize.define(
  "Flight",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    flight_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    airline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departure_gate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrival_gate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scheduled_departure: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    scheduled_arrival: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    actual_departure: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    actual_arrival: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: "flights",
  }
);

export default Flights;
