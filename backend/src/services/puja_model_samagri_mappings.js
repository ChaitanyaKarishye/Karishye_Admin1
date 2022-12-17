const db = require('../db/models');
const Puja_model_samagri_mappingsDBApi = require('../db/api/puja_model_samagri_mappings');

module.exports = class Puja_model_samagri_mappingsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Puja_model_samagri_mappingsDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let puja_model_samagri_mappings = await Puja_model_samagri_mappingsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!puja_model_samagri_mappings) {
        throw new ValidationError(
          'puja_model_samagri_mappingsNotFound',
        );
      }

      await Puja_model_samagri_mappingsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return puja_model_samagri_mappings;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await Puja_model_samagri_mappingsDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

