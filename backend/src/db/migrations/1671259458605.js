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
      await queryInterface.dropTable('puja_samagri_mappings', { transaction });

      await queryInterface.createTable(
        'puja_models',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'puja_model_samagri_mappings',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'karusers',
        'is_karishye_sourced',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.removeColumn('pujas', 'duration_hrs', {
        transaction,
      });

      await queryInterface.addColumn(
        'pujas',
        'kar_id',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pujas',
        'region',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pujas',
        'mode1',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['remote', 'at_my_home', 'near_my_home', 'on_behalf'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pujas',
        'videos',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pujas',
        'images',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'samagri',
        'kar_id',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.removeColumn('samagri', 'price_standard_qty', {
        transaction,
      });

      await queryInterface.renameColumn('samagri', 'qty_units', 'units', {
        transaction,
      });

      await queryInterface.removeColumn('samagri', 'karishye_provided', {
        transaction,
      });

      await queryInterface.removeColumn('samagri', 'units_in_stock', {
        transaction,
      });

      await queryInterface.addColumn(
        'samagri',
        'cost_price',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'samagri',
        'pujari_selling_price',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'samagri',
        'customer_mrp',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'samagri',
        'karishye_provided',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['stocks', 'does_not_stock', 'does_not_stock_but_can_supply'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pujas',
        'mode2',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['remote', 'at_my_home', 'near_my_home', 'on_behalf'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pujas',
        'mode3',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['remote', 'at_my_home', 'near_my_home', 'on_behalf'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_models',
        'kar_id',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_models',
        'duration',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_models',
        'pujari_cost',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_models',
        'no_of_pujaris',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_models',
        'model_selling_price',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_models',
        'advance_amount',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_models',
        'is_popular_model',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_model_samagri_mappings',
        'kar_id',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'puja_model_samagri_mappings',
        'no_of_standard_qty',
        {
          type: Sequelize.DataTypes.INTEGER,
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
        'no_of_standard_qty',
        { transaction },
      );

      await queryInterface.removeColumn(
        'puja_model_samagri_mappings',
        'kar_id',
        { transaction },
      );

      await queryInterface.removeColumn('puja_models', 'is_popular_model', {
        transaction,
      });

      await queryInterface.removeColumn('puja_models', 'advance_amount', {
        transaction,
      });

      await queryInterface.removeColumn('puja_models', 'model_selling_price', {
        transaction,
      });

      await queryInterface.removeColumn('puja_models', 'no_of_pujaris', {
        transaction,
      });

      await queryInterface.removeColumn('puja_models', 'pujari_cost', {
        transaction,
      });

      await queryInterface.removeColumn('puja_models', 'duration', {
        transaction,
      });

      await queryInterface.removeColumn('puja_models', 'kar_id', {
        transaction,
      });

      await queryInterface.removeColumn('pujas', 'mode3', { transaction });

      await queryInterface.removeColumn('pujas', 'mode2', { transaction });

      await queryInterface.removeColumn('samagri', 'karishye_provided', {
        transaction,
      });

      await queryInterface.removeColumn('samagri', 'customer_mrp', {
        transaction,
      });

      await queryInterface.removeColumn('samagri', 'pujari_selling_price', {
        transaction,
      });

      await queryInterface.removeColumn('samagri', 'cost_price', {
        transaction,
      });

      await queryInterface.addColumn(
        'samagri',
        'units_in_stock',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'samagri',
        'karishye_provided',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.renameColumn('samagri', 'units', 'qty_units', {
        transaction,
      });

      await queryInterface.addColumn(
        'samagri',
        'price_standard_qty',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.removeColumn('samagri', 'kar_id', { transaction });

      await queryInterface.removeColumn('pujas', 'images', { transaction });

      await queryInterface.removeColumn('pujas', 'videos', { transaction });

      await queryInterface.removeColumn('pujas', 'mode1', { transaction });

      await queryInterface.removeColumn('pujas', 'region', { transaction });

      await queryInterface.removeColumn('pujas', 'kar_id', { transaction });

      await queryInterface.addColumn(
        'pujas',
        'duration_hrs',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.removeColumn('karusers', 'is_karishye_sourced', {
        transaction,
      });

      await queryInterface.dropTable('puja_model_samagri_mappings', {
        transaction,
      });

      await queryInterface.dropTable('puja_models', { transaction });

      await queryInterface.createTable(
        'puja_samagri_mappings',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
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
};
