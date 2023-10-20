const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const posts = await models.Friend.findAll({
      include: [
        {
          model: models.User,
          as: "Reciever",
        },
        {
          model: models.User,
          as: "Sender",
        },
      ],
    });
    res.send(posts);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send(error);
  }
});

router.get("/:friendId", async (req, res) => {
  try {
    if (!req.params.friendId) throw new Error("Friend Id is requireds");
    const friendId = await models.Friend.findOne({
      where: {
        friendId: req.params.friendId,
      },
      include: [
        {
          model: models.User,
          as: "Reciever",
        },
        {
          model: models.User,
          as: "Sender",
        },
      ],
    });
    res.send(friendId);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.senderId) throw new Error("Sender Id is mandatory");
    if (!req.body.receiverId) throw new Error("Receiver Id is mandatory");
    const Friend = await models.Friend.create(req.body);
    res.send(Friend);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send(error);
  }
});

router.put("/", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.friendId) throw new Error("Friend Id is mandatory");
    if (!req.body.senderId) throw new Error("Sender Id is mandatory");
    if (!req.body.receiverId) throw new Error("Receiver Id is mandatory");
    const Friend = await models.Friend.findOne({
      where: {
        friendId: req.body.friendId,
      },
    });
    if (Friend) {
      const updateFriend = await models.Friend.update(req.body, {
        where: { friendId: req.body.friendId },
      });
      res.send(updateFriend);
    } else {
      res.status(404).send("Friend not found");
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send(error);
  }
});

router.delete("/:friendId", async (req, res) => {
  try {
    const friend = await models.Friend.findOne({
      where: { friendId: req.params.friendId },
    });
    if (friend) {
      await friend.destroy();
      res.status(204).send("The Friend has been successfully deleted");
    } else {
      res.status(404).send("Friend not found");
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send(error);
  }
});

module.exports = router;
