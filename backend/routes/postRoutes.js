const express = require("express");
const multer = require("multer");
const authenticateUser = require("../middleware/auth");
const Post = require("../models/Post");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../config/db"); // Ensure you have this line
const path = require("path");

// Image Upload Setup


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads"); // Ensure correct path
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });
// const upload = multer({ storage : storage });




// Serve uploaded files as static assets
// router.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// Create Post (Protected):

router.post("/create", authenticateUser, upload.single("image"), (req, res) => {
  try {
    const { user_id, content } = req.body;
    const image = req.file ? req.file.filename : null; // Store image filename if uploaded

    if (!user_id || !content) {
      return res.status(400).json({ error: "user_id and content are required" });
    }

        // ✅ Ensure `image` is included in the SQL query
        Post.create(user_id, content, image, (err, result) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
          }
          res.json({ message: "Post created successfully", postId: result.insertId, image });
        });
      } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
      }
});

// router.post("/create", authenticateUser, (req, res) => {
//   try {
//     const { user_id, content } = req.body;

//     if (!user_id || !content) {
//       return res.status(400).json({ error: "user_id and content are required" });
//     }

//     // Ensure user_id is a string (for SQL escaping)
//     const escapedUserId = mysql.escape(user_id);
//     const escapedContent = mysql.escape(content);

//     const query = `INSERT INTO posts (user_id, content) VALUES (${escapedUserId}, ${escapedContent})`;

//     db.query(query, (err, result) => {
//       if (err) {
//         console.error("Database error:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json({ message: "Post created successfully", postId: result.insertId });
//     });
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// Get all posts
// x
router.get("/", async (req, res) => {
  try {
      const sql = `
        SELECT posts.id, posts.content, posts.likes, posts.image, posts.created_at, users.username 
        FROM posts 
        JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
      `;

      db.query(sql, (err, results) => {
          if (err) {
              console.error("Error fetching posts:", err);
              return res.status(500).json({ error: "Database error" });
          }

          console.log("Fetched Posts from DB:", results); // ✅ Debugging log
          res.json(results);
      });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
  }
});


// router.get("/", (req, res) => {
//   Post.getAll((err, results) => {
//     if (err) return res.status(500).json({ message: "Error fetching posts" });
//     res.json(results);
//   });
// });

// // Like a Post
// const authenticateToken = require("../middleware/auth");

// router.post("/like/:id", authenticateToken, async (req, res) => {
//   console.log("🔍 Received Like Request:");
//   console.log("Headers:", req.headers);
//   console.log("Extracted Token:", req.headers.authorization);

//   if (!req.user) {
//     return res.status(401).json({ message: "Invalid token" });
//   }

//   try {
//     // Your like logic...
//   } catch (error) {
//     console.error(" Error liking post:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// router.post("like/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     post.likes += 1; // Increment likes count
//     await post.save();

//     res.json({ message: "Post liked!", likes: post.likes }); // ✅ Ensure response contains `likes`
//   } catch (error) {
//     res.status(500).json({ message: "Error liking post", error: error.message });
//   }
// });


// router.post("/like/:id", authenticateUser, (req, res) => {
//   const post_id = req.params.id;

//   Post.like(post_id, (err, result) => {
//     if (err) return res.status(500).json({ message: "Error liking post" });
    
//     res.json({ message: "Post liked successfully" });
//   });
// });


// // Unlike a post
// router.post("/unlike/:id", authenticateUser, (req, res) => {
//   Post.unlike(req.params.id, (err) => {
//     if (err) return res.status(500).json({ message: "Error unliking post" });
//     res.json({ message: "Post unliked successfully" });
//   });
// });


// router.post("/like/:id", authenticateUser, (req, res) => {
//   const post_id = req.params.id;

//   Post.like(post_id, (err, result) => {
//     if (err) return res.status(500).json({ message: "Error liking post" });

//     // Fetch the updated likes count
//     Post.getLikes(post_id, (err, likesCount) => {
//       if (err) return res.status(500).json({ message: "Error retrieving like count" });

//       res.json({ likes: likesCount }); // ✅ Return updated like count
//     });
//   });
// });

// // Unlike a post
// router.post("/unlike/:id", authenticateUser, (req, res) => {
//   const post_id = req.params.id;

//   Post.unlike(post_id, (err) => {
//     if (err) return res.status(500).json({ message: "Error unliking post" });

//     // Fetch the updated likes count
//     Post.getLikes(post_id, (err, likesCount) => {
//       if (err) return res.status(500).json({ message: "Error retrieving like count" });

//       res.json({ likes: likesCount }); // ✅ Return updated like count
//     });
//   });
// });


// Like a Post
router.post("/like/:id", authenticateUser, (req, res) => {
  console.log("Authenticated user:", req.user);  // Debugging statement
  const post_id = req.params.id;

  Post.like(post_id, (err, result) => {
    if (err) return res.status(500).json({ message: "Error liking post" });
    res.json({ message: "Post liked successfully" });
  });
});


// Unlike a post
router.post("/unlike/:id", authenticateUser, (req, res) => {
  Post.unlike(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Error unliking post" });
    res.json({ message: "Post unliked successfully" });
  });
});


module.exports = router;
