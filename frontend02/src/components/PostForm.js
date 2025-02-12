import React, { useState } from "react";
import { createPost } from "../api/api";
import { TextField, Button, Card, CardContent } from "@mui/material";

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const userId = localStorage.getItem("user_id"); // Get logged-in user ID
    if (!userId) {
      console.error("User not logged in!");
      return;
    }

    try {
      await createPost({ user_id: userId, content }); // Send dynamic user_id
      setContent("");
      onPostCreated(); // Refresh the post feed
    } catch (error) {
      console.error("Error creating post:", error);
      alert(error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Write a post..."
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={2}
          />
          <Button type="submit" variant="contained" sx={{ marginTop: 1 }}>
            Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
