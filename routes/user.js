const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const users = await models.User.findAll();
    res.send(users);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send("Error: " + error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      res.status(400).send("User ID is required as a path parameter");
      return;
    }
    const user = await models.User.findOne({
      where: { userId },
    });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.email) throw new Error("Email is mandatory");
    const user = await models.User.create(req.body);
    res.send(user);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send("Error: ", error);
  }
});

router.put("/", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.userId) throw new Error("Userid is mandatory");
    if (!req.body.email) throw new Error("Email is mandatory");
    const user = await models.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (user) {
      const updateUser = await models.User.update(req.body, {
        where: { userId: req.body.userId },
      });
      res.send(updateUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send("Error: ", error);
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { userId: req.params.userId },
    });
    if (user) {
      await models.Friend.destroy({
        where: { senderId: user.userId },
      });
      await models.Friend.destroy({
        where: { receiverId: user.userId },
      });
      await models.Post.destroy({
        where: { userId: user.userId },
      });
      await user.destroy();
      res.status(204).send("The User has been successfully deleted");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send("Error: ", error);
  }
});

module.exports = router;
