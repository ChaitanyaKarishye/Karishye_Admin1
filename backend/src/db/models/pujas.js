const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const pujas = sequelize.define(
    'pujas',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      language: {
        type: DataTypes.ENUM,

        values: ['Telugu', 'Other'],
      },

      region: {
        type: DataTypes.TEXT,
      },

      mode1: {
        type: DataTypes.ENUM,

        values: ['remote', 'at_my_home', 'near_my_home', 'on_behalf'],
      },

      videos: {
        type: DataTypes.TEXT,
      },

      images: {
        type: DataTypes.TEXT,
      },

      mode2: {
        type: DataTypes.ENUM,

        values: ['remote', 'at_my_home', 'near_my_home', 'on_behalf'],
      },

      mode3: {
        type: DataTypes.ENUM,

        values: ['remote', 'at_my_home', 'near_my_home', 'on_behalf'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  pujas.associate = (db) => {
    db.pujas.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.pujas.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return pujas;
};
