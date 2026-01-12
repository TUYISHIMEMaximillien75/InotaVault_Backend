'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('songs', 'likes', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
     
    await queryInterface.addColumn('songs', 'artist', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('songs', 'usage', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('songs', 'likes');
    await queryInterface.removeColumn('songs', 'artist');
    await queryInterface.removeColumn('songs', 'usage');
  },
};
