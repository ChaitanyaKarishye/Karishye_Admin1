const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SamagriDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const samagri = await db.samagri.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        description: data.description || null,
        standard_qty: data.standard_qty || null,
        qty_units: data.qty_units || null,
        cost_price: data.cost_price || null,
        pujari_selling_price: data.pujari_selling_price || null,
        customer_mrp: data.customer_mrp || null,
        karishye_provided: data.karishye_provided || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return samagri;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const samagri = await db.samagri.findByPk(id, {
      transaction,
    });

    await samagri.update(
      {
        name: data.name || null,
        description: data.description || null,
        standard_qty: data.standard_qty || null,
        qty_units: data.qty_units || null,
        cost_price: data.cost_price || null,
        pujari_selling_price: data.pujari_selling_price || null,
        customer_mrp: data.customer_mrp || null,
        karishye_provided: data.karishye_provided || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return samagri;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const samagri = await db.samagri.findByPk(id, options);

    await samagri.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await samagri.destroy({
      transaction,
    });

    return samagri;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const samagri = await db.samagri.findOne({ where }, { transaction });

    if (!samagri) {
      return samagri;
    }

    const output = samagri.get({ plain: true });

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
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('samagri', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('samagri', 'description', filter.description),
        };
      }

      if (filter.standard_qtyRange) {
        const [start, end] = filter.standard_qtyRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            standard_qty: {
              ...where.standard_qty,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            standard_qty: {
              ...where.standard_qty,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.cost_priceRange) {
        const [start, end] = filter.cost_priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            cost_price: {
              ...where.cost_price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            cost_price: {
              ...where.cost_price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.pujari_selling_priceRange) {
        const [start, end] = filter.pujari_selling_priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            pujari_selling_price: {
              ...where.pujari_selling_price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            pujari_selling_price: {
              ...where.pujari_selling_price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.customer_mrpRange) {
        const [start, end] = filter.customer_mrpRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            customer_mrp: {
              ...where.customer_mrp,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            customer_mrp: {
              ...where.customer_mrp,
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
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.qty_units) {
        where = {
          ...where,
          qty_units: filter.qty_units,
        };
      }

      if (filter.karishye_provided) {
        where = {
          ...where,
          karishye_provided: filter.karishye_provided,
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

    let { rows, count } = await db.samagri.findAndCountAll({
      where,
      include,
      distinct: true,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction,
    });

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
          Utils.ilike('samagri', 'id', query),
        ],
      };
    }

    const records = await db.samagri.findAll({
      attributes: ['id', 'id'],
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
