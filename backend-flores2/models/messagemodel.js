'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MessageModel.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    nomortlpn: DataTypes.STRING,
    pesan: DataTypes.TEXT,
    tanggal: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'MessageModel',
  });
  return MessageModel;
};