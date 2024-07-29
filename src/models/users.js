import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import ActiveNotifications from "./active-notifications.js";
import Notifications from "./notifications.js";

const User = sequelize.define(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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
    tableName: "users",
  }
);

// User.hasMany(ActiveNotifications, { foreignKey: "user_id" });
// ActiveNotifications.belongsTo(User, { foreignKey: "id" });

// User.hasMany(Notifications, { foreignKey: "user_id" });
// Notifications.belongsTo(User, { foreignKey: "id" });

export default User;
