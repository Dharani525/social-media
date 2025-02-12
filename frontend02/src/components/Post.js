import React, { useState, useEffect } from "react";
import { likePost, fetchComments, addComment } from "../api/api";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import { useCallback } from "react";

const Post = ({ post, onPostUpdated }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  // const [liked, setLiked] = useState(false);

 

  const loadComments = useCallback(async () => {
    try {
      const response = await fetchComments(post.id);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [post.id]);

   
  useEffect(() => {
    loadComments();
  }, [loadComments]); 




  const handleLike = async () => {
    try {
      await likePost(post.id);
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // const handleLike = async () => {
  //   try {
  //     await likePost(post.id);
  //     setLikes(liked ? likes - 1 : likes + 1);
  //     setLiked(!liked);
  //   } catch (error) {
  //     console.error("Error liking post:", error);
  //   }
  // };



  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment({ post_id: post.id, user_id: 1, comment: newComment });
      setNewComment("");
      loadComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
      <Typography variant="h6">{post.username}</Typography>  {/* Show username */}
        <Typography>{post.content}</Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(post.created_at).toLocaleString()}
        </Typography>
        <Button onClick={handleLike}>Like ({likes})</Button>
    

        {/* Comments Section */}
        <div>
          <Typography variant="body2">Comments:</Typography>
          {comments.map((comment) => (
            <Typography key={comment.id} variant="body2">
              {comment.username}: {comment.comment}
            </Typography>
          ))}

          <form onSubmit={handleCommentSubmit}>
            <TextField
              label="Write a comment..."
              size="small"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ marginTop: 1 }}
            />
            <Button type="submit" variant="contained" size="small" sx={{ marginTop: 1 }}>
              Comment
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
