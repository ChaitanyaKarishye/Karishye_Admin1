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

    db.puja_model_samagri_mappings.belongsTo(db.puja_models, {
      as: 'model_id',
      foreignKey: {
        name: 'model_idId',
      },
      constraints: false,
    });

    db.puja_model_samagri_mappings.belongsTo(db.samagri, {
      as: 'samagri_id',
      foreignKey: {
        name: 'samagri_idId',
      },
      constraints: false,
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

