const {DataTypes} = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
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