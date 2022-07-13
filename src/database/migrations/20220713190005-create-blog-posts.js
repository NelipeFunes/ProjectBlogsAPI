module.exports = {

  /**
     * @param {import('sequelize').QueryInterface} queryInterface 
     * @param {import('sequelize').Sequelize} Sequelize 
     */
  
    async up(queryInterface,Sequelize) {
      await queryInterface.createTable('BlogPosts', {
  
        id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:  true,
        },
  
        title: {
          allowNull:false,
          type:Sequelize.STRING,
        },
  
        content: {
          allowNull:false,
          type:Sequelize.STRING,
        },
  
        userId: {
          allowNull:false,
          type:Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model:"Users",
            key: "id",
          }
        },
  
        published: {
          allowNull: false,
          type: Sequelize.DATE,
        },
  
        updated: {
          allowNull: false,
          type: Sequelize.DATE,
        }
  
      });
    },
  
    /**
     * @param {import('sequelize').QueryInterface} queryInterface 
     * @param {import('sequelize').Sequelize} Sequelize 
     */
  
    async down(queryInterface,Sequelize) {
      await queryInterface.dropTable('BlogPosts');
    }
  }