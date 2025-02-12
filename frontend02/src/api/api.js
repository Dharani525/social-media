import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/users/register`, userData);
};



export const loginUser = async (email, password) => {

  try {
    const response = await axios.post("http://localhost:5000/api/users/login", {
      email,  // Should be a string, not an object
      password
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data);
    throw error;
  }
}


//   try {
//     console.log("Logging in with:", { email, password }); // Debugging
//     const response = await axios.post(`${API_URL}/users/login`, { email, password });
//     console.log("Login success:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Login failed:", error.response?.data || error.message);
//     throw error;
//   }
// };



// export const loginUser = async (email, password) => {
//   try {
//     const response = await axios.post("http://localhost:5000/api/users/login", {
//       email,
//       password,
//     });

//     const { token, user } = response.data;
//     localStorage.setItem("token", token);  // Store JWT token
//     localStorage.setItem("user_id", user.id);  // Store user ID

//     return response.data;
//   } catch (error) {
//     console.error("Login failed:", error);
//     throw error;
//   }
// };



export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};


const getToken = () => localStorage.getItem("token");




export const createPost = async (postData) => {
  try {
    const token = localStorage.getItem("token"); // Ensure user is authenticated
    const response = await axios.post(`${API_URL}/posts/create`, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach token if needed
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error.response?.data || error.message);
    throw error;
  }
};



export const likePost = async (postId) => {
  try {
    const token = localStorage.getItem("token"); // Ensure the user is authenticated
    const response = await axios.post(
      `http://localhost:5000/api/posts/like/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error liking post:", error.response?.data || error.message);
    throw error;
  }
};



export const addComment = async (commentData) => {
    return await axios.post(`${API_URL}/comments/create`, commentData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  };


export const fetchComments = async (postId) => {
  return await axios.get(`${API_URL}/comments/${postId}`);
};




