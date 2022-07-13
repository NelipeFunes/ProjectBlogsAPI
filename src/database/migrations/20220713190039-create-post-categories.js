
module.exports = {
  /**
     * @param {import('sequelize').QueryInterface} queryInterface 
     * @param {import('sequelize').Sequelize} Sequelize 
     */
  async up(queryInterface,Sequelize) {
    await queryInterface.createTable('PostCategories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BlogPosts',
          key: 'id',
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        }
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PostCategories')
  }
}