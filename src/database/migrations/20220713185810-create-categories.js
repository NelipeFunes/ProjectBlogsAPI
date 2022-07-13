module.exports = {
  /**
    * @param {import('sequelize').QueryInterface} queryInterface 
    * @param {import('sequelize').Sequelize} Sequelize 
    */
   async up(queryInterface,Sequelize) {
     await queryInterface.createTable('Categories', {
       id: {
         type: Sequelize.INTEGER,
         allowNull:false,
         primaryKey: true,
         autoIncrement: true,
       },

       name: {
         type: Sequelize.STRING,
         allowNull: false,
       }
     })
   },
 async down(queryInterface, Sequelize) {
   await queryInterface.dropTable('Categories');
 }
}