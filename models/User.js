module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    slack_ID: {
      type: DataTypes.STRING
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE
    }
  });
};
