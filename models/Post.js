module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      postId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      timstamps: true,
    }
  );

  Post.associate = (models) => {
    models.Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "User",
    });
  };

  return Post;
};
