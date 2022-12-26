module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'puja_models',
        'puja_idId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'pujas',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_model_samagri_mappings',
        'model_idId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'puja_models',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_model_samagri_mappings',
        'samagri_idId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'samagri',
            key: 'id',
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn(
        'puja_model_samagri_mappings',
        'samagri_idId',
        { transaction },
      );

      await queryInterface.removeColumn(
        'puja_model_samagri_mappings',
        'model_idId',
        { transaction },
      );

      await queryInterface.removeColumn('puja_models', 'puja_idId', {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
