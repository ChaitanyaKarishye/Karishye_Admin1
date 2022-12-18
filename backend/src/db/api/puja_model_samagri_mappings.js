
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Puja_model_samagri_mappingsDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const puja_model_samagri_mappings = await db.puja_model_samagri_mappings.create(
  {
  id: data.id || undefined,

    no_of_standard_qty: data.no_of_standard_qty
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await puja_model_samagri_mappings.setModel_id(data.model_id || null, {
    transaction,
    });

    await puja_model_samagri_mappings.setSamagri_id(data.samagri_id || null, {
    transaction,
    });

  return puja_model_samagri_mappings;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const puja_model_samagri_mappings = await db.puja_model_samagri_mappings.findByPk(id, {
      transaction,
    });

    await puja_model_samagri_mappings.update(
      {

        no_of_standard_qty: data.no_of_standard_qty
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await puja_model_samagri_mappings.setModel_id(data.model_id || null, {
      transaction,
    });

    await puja_model_samagri_mappings.setSamagri_id(data.samagri_id || null, {
      transaction,
    });

    return puja_model_samagri_mappings;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const puja_model_samagri_mappings = await db.puja_model_samagri_mappings.findByPk(id, options);

    await puja_model_samagri_mappings.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await puja_model_samagri_mappings.destroy({
      transaction
    });

    return puja_model_samagri_mappings;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const puja_model_samagri_mappings = await db.puja_model_samagri_mappings.findOne(
      { where },
      { transaction },
    );

    if (!puja_model_samagri_mappings) {
      return puja_model_samagri_mappings;
    }

    const output = puja_model_samagri_mappings.get({plain: true});

    output.model_id = await puja_model_samagri_mappings.getModel_id({
      transaction
    });

    output.samagri_id = await puja_model_samagri_mappings.getSamagri_id({
      transaction
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [

      {
        model: db.puja_models,
        as: 'model_id',
      },

      {
        model: db.samagri,
        as: 'samagri_id',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.no_of_standard_qtyRange) {
        const [start, end] = filter.no_of_standard_qtyRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            no_of_standard_qty: {
              ...where.no_of_standard_qty,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            no_of_standard_qty: {
              ...where.no_of_standard_qty,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active:
            filter.active === true ||
            filter.active === 'true',
        };
      }

      if (filter.model_id) {
        var listItems = filter.model_id.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          model_idId: {[Op.or]: listItems}
        };
      }

      if (filter.samagri_id) {
        var listItems = filter.samagri_id.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          samagri_idId: {[Op.or]: listItems}
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = await db.puja_model_samagri_mappings.findAndCountAll(
      {
        where,
        include,
        distinct: true,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: (filter.field && filter.sort)
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
        transaction,
      },
    );

//    rows = await this._fillWithRelationsAndFilesForRows(
//      rows,
//      options,
//    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike(
            'puja_model_samagri_mappings',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.puja_model_samagri_mappings.findAll({
      attributes: [ 'id', 'id' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }

};

