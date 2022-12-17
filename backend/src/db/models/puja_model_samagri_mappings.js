const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const puja_model_samagri_mappings = sequelize.define(
    'puja_model_samagri_mappings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

kar_id: {
        type: DataTypes.INTEGER,

      },

no_of_standard_qty: {
        type: DataTypes.INTEGER,

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

  puja_model_samagri_mappings.associate = (db) => {

    db.puja_model_samagri_mappings.belongsToMany(db.puja_models, {
      as: 'model_id',
      foreignKey: {
        name: 'puja_model_samagri_mappings_model_idId',
      },
      constraints: false,
      through: 'puja_model_samagri_mappingsModel_idPuja_models',
    });

    db.puja_model_samagri_mappings.belongsToMany(db.samagri, {
      as: 'samagri_id',
      foreignKey: {
        name: 'puja_model_samagri_mappings_samagri_idId',
      },
      constraints: false,
      through: 'puja_model_samagri_mappingsSamagri_idSamagri',
    });

    db.puja_model_samagri_mappings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.puja_model_samagri_mappings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return puja_model_samagri_mappings;
};

