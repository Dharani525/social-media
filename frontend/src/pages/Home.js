import React, { useState, useEffect } from "react";
import { fetchPosts } from "../api/api";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetchPosts();
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
    <Typography variant="h4" gutterBottom>
      Social Media Feed
    </Typography>

    {/* Post Form */}
    <PostForm onPostCreated={loadPosts} />

    {/* Grid Layout for Posts */}
    <Grid container spacing={5}>  {/* ✅ Grid to arrange posts in a row */}
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={post.id}>
          <Post post={post} onPostUpdated={loadPosts} />
        </Grid>
      ))}
    </Grid>
  </Container>
  );
};

export default Home;
