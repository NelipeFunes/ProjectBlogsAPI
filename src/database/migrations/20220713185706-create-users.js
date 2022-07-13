'use strict'

module.exports = {

/**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */

  async up(queryInterface,Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull:false,
        type:Sequelize.STRING,
      },
      password: {
        allowNull:false,
        type:Sequelize.STRING,
      },
      image: {
        allowNull:false,
        type:Sequelize.STRING,
      }
    })
  },

/**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */

  async down(queryInterface,_Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
