'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TourModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TourModel.init({
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    lokasi: DataTypes.STRING,
    desksingkat: DataTypes.TEXT,
    desklengkap: DataTypes.TEXT,
    gambar: DataTypes.STRING,
    gambar1: DataTypes.STRING,
    gambar2: DataTypes.STRING,
    url: DataTypes.STRING,
    url1: DataTypes.STRING,
    url2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TourModel',
  });
  return TourModel;
};