const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PujasDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pujas = await db.pujas.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        description: data.description || null,
        language: data.language || null,
        region: data.region || null,
        mode1: data.mode1 || null,
        videos: data.videos || null,
        images: data.images || null,
        mode2: data.mode2 || null,
        mode3: data.mode3 || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return pujas;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pujas = await db.pujas.findByPk(id, {
      transaction,
    });

    await pujas.update(
      {
        name: data.name || null,
        description: data.description || null,
        language: data.language || null,
        region: data.region || null,
        mode1: data.mode1 || null,
        videos: data.videos || null,
        images: data.images || null,
        mode2: data.mode2 || null,
        mode3: data.mode3 || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return pujas;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pujas = await db.pujas.findByPk(id, options);

    await pujas.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await pujas.destroy({
      transaction,
    });

    return pujas;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const pujas = await db.pujas.findOne({ where }, { transaction });

    if (!pujas) {
      return pujas;
    }

    const output = pujas.get({ plain: true });

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
          [Op.and]: Utils.ilike('pujas', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('pujas', 'description', filter.description),
        };
      }

      if (filter.region) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('pujas', 'region', filter.region),
        };
      }

      if (filter.videos) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('pujas', 'videos', filter.videos),
        };
      }

      if (filter.images) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('pujas', 'images', filter.images),
        };
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

      if (filter.language) {
        where = {
          ...where,
          language: filter.language,
        };
      }

      if (filter.mode1) {
        where = {
          ...where,
          mode1: filter.mode1,
        };
      }

      if (filter.mode2) {
        where = {
          ...where,
          mode2: filter.mode2,
        };
      }

      if (filter.mode3) {
        where = {
          ...where,
          mode3: filter.mode3,
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

    let { rows, count } = await db.pujas.findAndCountAll({
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
          Utils.ilike('pujas', 'id', query),
        ],
      };
    }

    const records = await db.pujas.findAll({
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
