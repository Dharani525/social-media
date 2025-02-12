const db = require("../config/db");

const Post = {
  create: (user_id, content, image, callback) => {
    const sql = "INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)";
    db.query(sql, [user_id, content, image], callback);
  },

  getAll: (callback) => {
    const query = `
      SELECT posts.id, posts.content, posts.likes, users.username 
      FROM posts 
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.id DESC
    `;
    db.query(query, callback);
  },


 

  like: (post_id, callback) => {
    const sql = "UPDATE posts SET likes = likes + 1 WHERE id = ?";
    db.query(sql, [post_id], callback);
  },

  unlike: (post_id, callback) => {
    const sql = "UPDATE posts SET likes = likes - 1 WHERE id = ?";
    db.query(sql, [post_id], callback);
  }
};

module.exports = Post;
