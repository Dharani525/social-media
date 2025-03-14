const db = require("../config/db");

const Comment = {
  create: (post_id, user_id, comment, callback) => {
    const sql = "INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)";
    db.query(sql, [post_id, user_id, comment], callback);
  },

  getByPostId: (post_id, callback) => {
    const sql = `
      SELECT comments.*, users.username 
      FROM comments 
      JOIN users ON comments.user_id = users.id 
      WHERE post_id = ? 
      ORDER BY comments.created_at ASC`;
    db.query(sql, [post_id], callback);
  }
};

module.exports = Comment;
