module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
    slackID: {
      type: DataTypes.STRING
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY
    }
  });
  User.associate = models => {
    models.User.belongsTo(models.Dojo, { as: "primaryDojo" });
    models.User.hasMany(models.Relationship, { foreignKey: "person1Id" });
  };
  return User;
};
