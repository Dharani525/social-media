const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

// Add a comment
router.post("/create", (req, res) => {
  const { post_id, user_id, comment } = req.body;

  Comment.create(post_id, user_id, comment, (err, result) => {
    if (err) return res.status(500).json({ message: "Error adding comment" });
    res.status(201).json({ message: "Comment added successfully" });
  });
});

// Get comments for a post
router.get("/:post_id", (req, res) => {
  Comment.getByPostId(req.params.post_id, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching comments" });
    res.json(results);
  });
});

module.exports = router;
