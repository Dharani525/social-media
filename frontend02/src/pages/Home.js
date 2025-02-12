import React, { useState, useEffect } from "react";
import { fetchPosts } from "../api/api";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import { Container, Typography } from "@mui/material";

const Home = () => {
  const [posts, setPosts] = useState([]);


  const loadPosts = async () => {
    try {
      const response = await fetchPosts();
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Social Media Feed
      </Typography>
      <PostForm onPostCreated={loadPosts} />
      {/* {posts.map((post) => (
        <Post key={post.id} post={post} onPostUpdated={loadPosts} />
      ))} */}

      {/* Display posts from all users */}
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}

    </Container>
  );
};

export default Home;
