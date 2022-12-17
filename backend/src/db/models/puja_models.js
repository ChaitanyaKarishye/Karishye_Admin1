const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const puja_models = sequelize.define(
    'puja_models',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

kar_id: {
        type: DataTypes.INTEGER,

      },

duration: {
        type: DataTypes.INTEGER,

      },

pujari_cost: {
        type: DataTypes.INTEGER,

      },

no_of_pujaris: {
        type: DataTypes.INTEGER,

      },

model_selling_price: {
        type: DataTypes.INTEGER,

      },

advance_amount: {
        type: DataTypes.INTEGER,

      },

is_popular_model: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

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

  puja_models.associate = (db) => {

    db.puja_models.belongsToMany(db.pujas, {
      as: 'puja_id',
      foreignKey: {
        name: 'puja_models_puja_idId',
      },
      constraints: false,
      through: 'puja_modelsPuja_idPujas',
    });

    db.puja_models.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.puja_models.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return puja_models;
};

