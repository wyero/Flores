'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TourModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.INTEGER
      },
      lokasi: {
        type: Sequelize.STRING
      },
      desksingkat: {
        type: Sequelize.TEXT
      },
      desklengkap: {
        type: Sequelize.TEXT
      },
      gambar: {
        type: Sequelize.STRING
      },
      gambar1: {
        type: Sequelize.STRING
      },
      gambar2: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      url1: {
        type: Sequelize.STRING
      },
      url2: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TourModels');
  }
};