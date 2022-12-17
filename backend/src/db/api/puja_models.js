
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Puja_modelsDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const puja_models = await db.puja_models.create(
  {
  id: data.id || undefined,

    kar_id: data.kar_id
    ||
    null
,

    duration: data.duration
    ||
    null
,

    pujari_cost: data.pujari_cost
    ||
    null
,

    no_of_pujaris: data.no_of_pujaris
    ||
    null
,

    model_selling_price: data.model_selling_price
    ||
    null
,

    advance_amount: data.advance_amount
    ||
    null
,

    is_popular_model: data.is_popular_model
    ||
    false

,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await puja_models.setPuja_id(data.puja_id || [], {
    transaction,
    });

  return puja_models;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const puja_models = await db.puja_models.findByPk(id, {
      transaction,
    });

    await puja_models.update(
      {

        kar_id: data.kar_id
        ||
        null
,

        duration: data.duration
        ||
        null
,

        pujari_cost: data.pujari_cost
        ||
        null
,

        no_of_pujaris: data.no_of_pujaris
        ||
        null
,

        model_selling_price: data.model_selling_price
        ||
        null
,

        advance_amount: data.advance_amount
        ||
        null
,

        is_popular_model: data.is_popular_model
        ||
        false

,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await puja_models.setPuja_id(data.puja_id || [], {
      transaction,
    });

    return puja_models;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const puja_models = await db.puja_models.findByPk(id, options);

    await puja_models.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await puja_models.destroy({
      transaction
    });

    return puja_models;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const puja_models = await db.puja_models.findOne(
      { where },
      { transaction },
    );

    if (!puja_models) {
      return puja_models;
    }

    const output = puja_models.get({plain: true});

    output.puja_id = await puja_models.getPuja_id({
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
        model: db.pujas,
        as: 'puja_id',
        through: filter.puja_id ? { where: {
          [Op.or]: filter.puja_id.split('|').map(item => {
            return { ['Id']: Utils.uuid(item) }
          })
        }} : null,
        required: filter.puja_id ? true : null,
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.kar_idRange) {
        const [start, end] = filter.kar_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            kar_id: {
              ...where.kar_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            kar_id: {
              ...where.kar_id,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.durationRange) {
        const [start, end] = filter.durationRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            duration: {
              ...where.duration,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            duration: {
              ...where.duration,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.pujari_costRange) {
        const [start, end] = filter.pujari_costRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            pujari_cost: {
              ...where.pujari_cost,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            pujari_cost: {
              ...where.pujari_cost,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.no_of_pujarisRange) {
        const [start, end] = filter.no_of_pujarisRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            no_of_pujaris: {
              ...where.no_of_pujaris,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            no_of_pujaris: {
              ...where.no_of_pujaris,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.model_selling_priceRange) {
        const [start, end] = filter.model_selling_priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            model_selling_price: {
              ...where.model_selling_price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            model_selling_price: {
              ...where.model_selling_price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.advance_amountRange) {
        const [start, end] = filter.advance_amountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            advance_amount: {
              ...where.advance_amount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            advance_amount: {
              ...where.advance_amount,
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

      if (filter.is_popular_model) {
        where = {
          ...where,
          is_popular_model: filter.is_popular_model,
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

    let { rows, count } = await db.puja_models.findAndCountAll(
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
            'puja_models',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.puja_models.findAll({
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

