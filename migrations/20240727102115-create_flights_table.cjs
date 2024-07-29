'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flight_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      airline: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departure_gate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      arrival_gate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      scheduled_departure: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      scheduled_arrival: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      actual_departure: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      actual_arrival: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('flights');
  }
};
