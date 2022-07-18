const {DataTypes} = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull:false,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize) => {
  const model = sequelize.define('Category', attributes, {
    tableName: 'Categories',
    timestamps: false
  });
  return model;
}