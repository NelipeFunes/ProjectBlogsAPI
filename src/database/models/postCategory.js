const { DataTypes } = require('sequelize');

const attr = {
  postId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  }
}

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize) => {
  const model = sequelize.define('PostCategory', attr, {
    timestamps: false,
    tableName: 'PostCategories',
  });
    model.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        through: model,
        foreignKey: 'categoryId',
        otherKey: 'postId',
        as: 'posts',
      });
    models.BlogPost.belongsToMany(models.Category, {
        through: model,
        foreignKey: 'postId',
        otherKey: 'categoryId',
        as: 'categories'
    });
  }
  return model;
}
