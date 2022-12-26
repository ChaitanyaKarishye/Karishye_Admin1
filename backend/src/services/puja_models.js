const db = require('../db/models');
const Puja_modelsDBApi = require('../db/api/puja_models');

module.exports = class Puja_modelsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Puja_modelsDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let puja_models = await Puja_modelsDBApi.findBy({ id }, { transaction });

      if (!puja_models) {
        throw new ValidationError('puja_modelsNotFound');
      }

      await Puja_modelsDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return puja_models;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await Puja_modelsDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
