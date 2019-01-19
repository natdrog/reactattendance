module.exports = function(sequelize, DataTypes) {
  return sequelize.define("WeekCode", {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
