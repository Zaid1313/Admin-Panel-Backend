const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const friendRoutes = require("./routes/friend");
const models = require("./models");
const cors = require("cors");
const { usersData, friendsData, postsData } = require("./const");

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/friend", friendRoutes);

// Define your routes
app.get("/", (req, res) => {
  res.send("Hello, Express Boilerplate!");
});

app.get("/syncDB", async (req, res) => {
  await models.sequelize
    .sync({ alter: true,force:true })
    .then(async () => {
      console.log("Database synchronized");
      try {
        await fillDummyData();
        res.send("updated");
      } catch (e) {
        res.status(500).send(e);
      }
    })
    .catch((error) => {
      console.error(
        "An error occurred while synchronizing the database:",
        error
      );
    });
});

app.get("/dummy-data", async (req, res) => {
  try {
    await fillDummyData();
    res.send("Data uploaded");
  } catch (e) {
    res.status(500).send(e);
  }
});

const fillDummyData = async () => {
  try {
    await models.User.bulkCreate(usersData);
    await models.Post.bulkCreate(postsData);
    await models.Friend.bulkCreate(friendsData);
  } catch (e) {
    console.log(e);
  }
};

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
