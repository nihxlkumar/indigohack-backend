"use strict";
// import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `INSERT INTO users (name, phone, email, password, "createdAt", "updatedAt") 
       VALUES ('Admin', '1234567890', 'admin@indigowithme.com','Admin@123', NOW(), NOW())`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
