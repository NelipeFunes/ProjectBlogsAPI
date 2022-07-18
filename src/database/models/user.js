const {DataTypes} = require('sequelize');

const attr = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  displayName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull:false,
    type:DataTypes.STRING,
  },
  password: {
    allowNull:false,
    type:DataTypes.STRING,
  },
  image: {
    allowNull:false,
    type:DataTypes.STRING,
  }
}

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize) => {
  const model = sequelize.define('User', attr, {
    tableName:'Users',
    timestamps: false,
  });
  model.associate = (models) => {
    model.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'posts'
    })
  }
  return model;
};