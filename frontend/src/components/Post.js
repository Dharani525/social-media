import React, { useState, useEffect, useCallback } from "react";
import { likePost, unlike, fetchComments, addComment } from "../api/api";
import { Card, CardHeader, CardMedia, CardContent, Container, CardActions, IconButton, Avatar, Typography, Button, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
// import Card from '@mui/material/Card';
// import  from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import ShareIcon from '@mui/icons-material/Share';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));








const Post = ({ post, onPostUpdated }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false); // New state for like status

  const imageUrl = post.image ? `http://localhost:5000/uploads/${post.image}` : null;
  // console.log("Image URL:", imageUrl); // ✅ Add this line for debugging




  const location = useLocation();
  const user_id = location.state?.user_id || localStorage.getItem("user_id"); // Get from URL state or localStorage
  const username = location.state?.username || localStorage.getItem("username"); // Get from URL state or localStorage
  const token = location.state?.token || localStorage.getItem("token"); // Get from URL state or localStorage




  const loadComments = useCallback(async () => {
    try {
      const response = await fetchComments(post.id);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [post.id]);






  // ---------------Handle Like ----------------

  // const handleLike = async () => {

  //   if (!token) {
  //     // console.error("No token found, user must be logged in.");
  //     alert("Please log in to like the post.");
  //     return;
  //   }
  //   try {
  //     if (isLiked) {
  //       await unlike(post.id); // 🔹 If already liked, unlike
  //       setLikes(likes - 1);     // 🔹 Decrement the likes count
  //       localStorage.setItem(`liked-${post.id}`, 'false');
  //       localStorage.setItem(`likes-${post.id}`, likes - 1);  // Persist updated like count
  //     } else {
  //       await likePost(post.id); // 🔹 If not liked, like the post
  //       setLikes(likes + 1);      // 🔹 Increment the likes count
  //       localStorage.setItem(`liked-${post.id}`, 'true');
  //       localStorage.setItem(`likes-${post.id}`, likes + 1);  // Persist updated like count
  //     }
  //     setIsLiked(!isLiked); // 🔹 Toggle the like status
  //   } catch (error) {
  //     console.error("Error toggling like status:", error);
  //     alert("please login again Your session expired");
  //   }
  // };


  // ---------------Handle Like ----------------
const handleLike = async () => {
  if (!token) {
    alert("Please log in to like the post.");
    return;
  }

  try {
    const userId = localStorage.getItem("user_id"); // 🔹 Get logged-in user ID
    const likedKey = `liked-${post.id}-${userId}`; // 🔹 Store like status per user
    const likesKey = `likes-${post.id}`; // 🔹 Store like count globally

    let currentLikes = parseInt(localStorage.getItem(likesKey)) || post.likes; // Use stored count or post count

    if (isLiked) {
      await unlike(post.id); // 🔹 If already liked, unlike
      setLikes(currentLikes - 1); // 🔹 Decrement the likes count
      localStorage.setItem(likedKey, "false"); // Store per user
      localStorage.setItem(likesKey, currentLikes - 1); // Update global count
    } else {
      await likePost(post.id); // 🔹 If not liked, like the post
      setLikes(currentLikes + 1); // 🔹 Increment the likes count
      localStorage.setItem(likedKey, "true"); // Store per user
      localStorage.setItem(likesKey, currentLikes + 1); // Update global count
    }

    setIsLiked(!isLiked); // 🔹 Toggle the like status
  } catch (error) {
    console.error("Error toggling like status:", error);
    alert("Please log in again. Your session expired.");
  }
};

// ---------------Handle Like Status on Load ----------------
useEffect(() => {
  const userId = localStorage.getItem("user_id");
  const likedKey = `liked-${post.id}-${userId}`;
  const likesKey = `likes-${post.id}`;

  const storedLikes = parseInt(localStorage.getItem(likesKey)) || post.likes;
  setLikes(storedLikes);

  const storedLikeStatus = localStorage.getItem(likedKey);
  setIsLiked(storedLikeStatus === "true");

  loadComments();
    // Check localStorage for the like status of this post
    // const storedLikeStatus = localStorage.getItem(`liked-${post.id}`);
    // if (storedLikeStatus === 'true') {
    //   setIsLiked(true);
    // } else {
    //   setIsLiked(false);
    // }
}, [post.id, loadComments]);



  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    if (!username) {
      // console.error("User is not logged in!");

      alert("Please log in to comment.");

      return;
    }

    try {
      await addComment({
        post_id: post.id,
        user_id,  // You may use the logged-in user's ID if available
        username: username, // Pass username along with the comment
        comment: newComment
      });
      setNewComment("");
      loadComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };



  // useEffect(() => {

  //   loadComments();
  //   // Check localStorage for the like status of this post
  //   const storedLikeStatus = localStorage.getItem(`liked-${post.id}`);
  //   if (storedLikeStatus === 'true') {
  //     setIsLiked(true);
  //   } else {
  //     setIsLiked(false);
  //   }
  // }, [post.id, loadComments]);


  // Material ui components
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };






  return (



    <Container >

      
      <Card sx={{ width: "100%", marginBottom: 9 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">

            </Avatar>
          }
          // action={
          //   // <IconButton aria-label="settings">
          //   //   <MoreVertIcon />
          //   // </IconButton>
          // }
          title={post.username}

          subheader={moment(post.created_at).format("MMMM Do YYYY, h:mm A")}
        />
        {imageUrl && (
  <CardMedia
    component="img"
    height="194"
    image={imageUrl}
    alt="Post"
    onError={(e) => {
      console.error("Image failed to load:", e.target.src); // ✅ Debugging line
      e.target.style.display = "none"; // Hide image if it fails to load
    }}
    
  />
)}
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <Typography sx={{ marginRight: 1 }}>{likes}</Typography>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon sx={{ color: isLiked ? "red" : "gray" }}/>
          </IconButton>
          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <Typography sx={{ marginLeft: 13, position: "relative" }}>Comments:</Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* Comments Section */}
            <div>

              {comments.map((comment) => (
                <Typography key={comment.id} variant="body2">
                  {comment.username}: {comment.comment} {/* Display the correct username */}
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
        </Collapse>
      </Card>



      {/*<Card sx={{ marginBottom: 2 }}>
        <CardContent>
          ✅ Display Username
          <Typography variant="h6">{post.username}</Typography>
          <Typography>{post.content}</Typography>


          {imageUrl && (
            <img
              src={imageUrl}
              alt="Post"
              onError={(e) => console.error("Image failed to load:", e.target.src)} // ✅ Debugging line
              style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
            />
          )}



          <Typography variant="body2">Likes: {likes}</Typography>


          ✅ Display the created_at date
          <Typography variant="body2" color="textSecondary">
            Posted on: {moment(post.created_at).format("MMMM Do YYYY, h:mm A")}
          </Typography>


          <Button variant="contained" size="small" onClick={handleLike}>
            {isLiked ? "Unlike" : "Like"}  🔹 Toggle button text
          </Button>

          Comments Section
          <div>
            <Typography variant="body2">Comments:</Typography>
            {comments.map((comment) => (
              <Typography key={comment.id} variant="body2">
                {comment.username}: {comment.comment} Display the correct username
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
      </Card> */}


    </Container>






  );
};

export default Post;
