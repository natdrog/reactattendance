module.exports = (sequelize, DataTypes) => {
  const WeekCode = sequelize.define("WeekCode", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  WeekCode.associate = models => {
    models.WeekCode.belongsTo(models.Dojo);
  };
  return WeekCode;
};
