const express = require("express");
const multer = require("multer");
const authenticateUser = require("../middleware/auth");
const Post = require("../models/Post");
const db = require("../config/db");
const router = express.Router();

// Image Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

//  Create a new post
router.post("/create", authenticateUser, (req, res) => {
  const { content } = req.body;
  const userId = req.user.id; // Get user ID from authentication middleware

  if (!content) {
    return res.status(400).json({ message: "Post content is required" });
  }

  db.query(
    "INSERT INTO posts (user_id, content) VALUES (?, ?)",
    [userId, content],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(201).json({ message: "Post created successfully", postId: result.insertId });
    }
  );
});

// Get all posts
router.get("/", (req, res) => {
  db.query(
    `SELECT posts.id, posts.content, posts.likes, posts.created_at, users.username 
     FROM posts 
     JOIN users ON posts.user_id = users.id 
     ORDER BY posts.created_at DESC`,
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json(results);
    }
  );
});



//  Like a post
router.post("/like/:postId", authenticateUser, (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id; // Ensure `authenticateUser` middleware sets `req.user`

  // Check if the post exists
  db.query("SELECT * FROM posts WHERE id = ?", [postId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user already liked the post
    db.query(
      "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
      [userId, postId],
      (err, likeResults) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error", error: err });
        }

        if (likeResults.length > 0) {
          // Unlike if already liked
          db.query(
            "DELETE FROM likes WHERE user_id = ? AND post_id = ?",
            [userId, postId],
            (err) => {
              if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
              }
              res.json({ message: "Post unliked" });
            }
          );
        } else {
          // Like if not already liked
          db.query(
            "INSERT INTO likes (user_id, post_id) VALUES (?, ?)",
            [userId, postId],
            (err) => {
              if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
              }
              res.json({ message: "Post liked" });
            }
          );
        }
      }
    );
  });
});

// Unlike a post
router.post("/:id/unlike", (req, res) => {
  Post.unlike(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Error unliking post" });
    res.json({ message: "Post unliked successfully" });
  });
});

module.exports = router;
