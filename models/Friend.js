module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    "Friend",
    {
      friendId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      senderId: {
        type: DataTypes.INTEGER,
      },
      receiverId: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("ACCEPTED", "PENDING"),
      },
    },
    {
      timstamps: true,
    }
  );

  Friend.associate = (models) => {
    models.Friend.belongsTo(models.User, {
      foreignKey: "senderId",
      as: "Sender",
    });
    models.Friend.belongsTo(models.User, {
      foreignKey: "receiverId",
      as: "Reciever",
    });
  };

  return Friend;
};
