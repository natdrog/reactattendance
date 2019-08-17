module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });
  Attendance.associate = models => {
    models.Attendance.belongsTo(models.Dojo, { as: "location" });
    models.Attendance.belongsTo(models.User, { as: "attendee" });
  };
  return Attendance;
};
