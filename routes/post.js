const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    const posts = await models.Post.findAll({
      include: [
        {
          model: models.User,
          as: "User",
        },
      ],
    });
    res.send(posts);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send( + error);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      res.status(400).send("Post ID is required as a path parameter");
      return;
    }
    const Post = await models.Post.findOne({
      where: { postId },
      include: [
        {
          model: models.User,
          as: "User",
        },
      ],
    });

    if (Post) {
      res.send(Post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.userId) throw new Error("User Id is mandatory");
    const Post = await models.Post.create(req.body);
    res.send(Post);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send( error);
  }
});

router.put("/", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.postId) throw new Error("Post Id is mandatory");
    if (!req.body.userId) throw new Error("User Id is mandatory");
    const Post = await models.Post.findOne({
      where: {
        postId: req.body.postId,
      },
    });
    if (Post) {
      const updatePost = await models.Post.update(req.body, {
        where: { postId: req.body.postId },
      });
      res.send(updatePost);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send( error);
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const post = await models.Post.findOne({
      where: { postId: req.params.postId },
    });
    if (post) {
      await post.destroy();
      res.status(204).send("The Post has been successfully deleted");
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send( error);
  }
});

module.exports = router;
