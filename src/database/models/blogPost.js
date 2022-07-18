const { DataTypes } = require('sequelize');

const attr = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  title: {
    type:DataTypes.STRING,
  },

  content: {
    type:DataTypes.STRING,
  },

  userId: {
    type:DataTypes.INTEGER,
    foreignKey: true
  },

  published: {
    type: DataTypes.DATE,
  },

  updated: {
    type: DataTypes.DATE,
  }
};

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize) => {
  const model = sequelize.define('BlogPost', attr, {
    tableName: 'BlogPosts',
    timestamps: false,
  });
  model.associate = (models) => {
    model.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    })
  }
  return model;
}