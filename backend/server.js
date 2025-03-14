const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
var router = express.Router();
require("dotenv").config();
const fs = require("fs");
const path = require("path");


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// ✅ Serve uploaded images correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads folder exists
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
//   console.log("✅ Created 'uploads/' directory");
// }



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });


// Use routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
