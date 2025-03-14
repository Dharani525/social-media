import React, { useState } from "react";
import { createPost } from "../api/api";
import { TextField, Button, Card, CardContent } from "@mui/material";
import { useLocation } from "react-router-dom";

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // Store selected image


  const location = useLocation();
  // const user_id = location.state?.user_id || localStorage.getItem("user_id"); // Get from URL state or localStorage


  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (!token) {
      alert("You are not logged in! Please log in first.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id",location.state?.user_id || localStorage.getItem("user_id")); // Get user_id from localStorage
    formData.append("content", content);
    if (image) {
      formData.append("image", image); // Attach image if selected
    }

    try {
      await createPost(formData);
      setContent("");
      setImage(null);
      onPostCreated();
    } catch (error) {
      console.error("Error creating post:", error);
      alert(error.message || "Failed to create post");
    }
  };


  // const user_id = localStorage.getItem("user_id"); // Replace with actual key if different
  // //  console.log(user_id)
  // const token = localStorage.getItem("token");

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!content.trim()) return;

  //     if (!token) {
  //         alert("You are not logged in! Please log in first.");
  //         return;
  //     }

  //     try {
  //         await createPost({ user_id , content });
  //         setContent("");
  //         onPostCreated();

  //     } catch (error) {
  //         console.error("Error creating post:", error);
  //         alert(error.message || "Failed to create post");
  //     }
  // };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!content.trim()) return;

  //   try {
  //     await createPost({ user_id , content });
  //     setContent("");
  //     onPostCreated();
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   }
  // };


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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Capture file
            style={{ marginTop: "10px" }}
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
