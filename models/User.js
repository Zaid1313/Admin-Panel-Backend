module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
      },
    },
    {
      timstamps: true,
    }
  );

  User.associate = (models) => {
    models.User.hasMany(models.Post, {
      foreignKey: "userId",
      targetKey: "userId",
      onDelete: "CASCADE",
      as: "Posts",
    });
    models.User.hasMany(models.Friend, {
      foreignKey: "receiverId",
      onDelete: "CASCADE",
      as: "receivedFriendRequests",
    });
    models.User.hasMany(models.Friend, {
      foreignKey: "senderId",
      onDelete: "CASCADE",
      as: "sentFriendRequests",
    });
  };

  return User;
};
