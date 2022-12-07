const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

firstName: {
        type: DataTypes.TEXT,

      },

lastName: {
        type: DataTypes.TEXT,

      },

phoneNumber: {
        type: DataTypes.TEXT,

      },

email: {
        type: DataTypes.TEXT,

      },

role: {
        type: DataTypes.ENUM,

        values: [

"admin",

"user"

        ],

      },

disabled: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

password: {
        type: DataTypes.TEXT,

      },

emailVerified: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

emailVerificationToken: {
        type: DataTypes.TEXT,

      },

emailVerificationTokenExpiresAt: {
        type: DataTypes.DATE,

      },

passwordResetToken: {
        type: DataTypes.TEXT,

      },

passwordResetTokenExpiresAt: {
        type: DataTypes.DATE,

      },

provider: {
        type: DataTypes.TEXT,

      },

type: {
        type: DataTypes.ENUM,

        values: [

"SUPER_ADMIN",

"PRIEST"

        ],

      },

email_verified_at: {
        type: DataTypes.DATE,

      },

first_time_login: {
        type: DataTypes.INTEGER,

      },

forgot_password_token: {
        type: DataTypes.TEXT,

      },

remember_token: {
        type: DataTypes.TEXT,

      },

forgot_password_token_timestamp: {
        type: DataTypes.DATE,

      },

is_active: {
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

  users.associate = (db) => {

    db.users.hasMany(db.file, {
      as: 'avatar',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.users.getTableName(),
        belongsToColumn: 'avatar',
      },
    });

    db.users.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.users.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

    users.beforeCreate((users, options) => {
        users = trimStringFields(users);

    if (users.provider !== providers.LOCAL && Object.values(providers).indexOf(users.provider) > -1) {
        users.emailVerified = true;

        if (!users.password) {
            const password = crypto
                .randomBytes(20)
                .toString('hex');

            const hashedPassword = bcrypt.hashSync(
            password,
            config.bcrypt.saltRounds,
        );

            users.password = hashedPassword
            }
        }
    });

  users.beforeUpdate((users, options) => {
    users = trimStringFields(users);
  });

  return users;
};

function trimStringFields(users) {
  users.email = users.email.trim();

  users.firstName = users.firstName
    ? users.firstName.trim()
    : null;

  users.lastName = users.lastName
    ? users.lastName.trim()
    : null;

  return users;
}

