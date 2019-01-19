module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Dojo", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    owner_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });
};
