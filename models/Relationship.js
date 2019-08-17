module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define("Relationship", {
    relationTo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Relationship.associate = models => {
    models.Relationship.belongsTo(models.User, { as: "person1" });
    models.Relationship.belongsTo(models.User, { as: "person2" });
  };
  return Relationship;
};
