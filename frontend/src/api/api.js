import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
      console.warn("No token found in localStorage!");
      return null;
  }
  return token;
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/users/register`, userData);
};

// export const loginUser = async (userData) => {
//   try {
//       const response = await axios.post(`${API_URL}/users/login`, userData);
//       localStorage.setItem("token", response.data.token); // Save token in localStorage
//       return response.data; // Return only necessary data
//   } catch (error) {
//       console.error("Login failed:", error);
//       throw error.response?.data || { message: "Login request failed" };
//   }
// };

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    
    // Save token and user_id in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user_id", response.data.user.id);  // Ensure backend returns `user.id`

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error.response?.data || { message: "Login request failed" };
  }
};

export const fetchPosts = async () => {
  return await axios.get(`${API_URL}/posts`);
};



export const createPost = async (postData) => {
    const token = getToken();

    if (!token) {
        throw new Error("Unauthorized: No token found");
    }

    try {
        const response = await axios.post(`${API_URL}/posts/create`, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Required for image uploads
          },
        });

        return response.data; // Return only necessary data
    } catch (error) {
        console.error("Post creation failed:", error);
        throw error.response?.data || { message: "Failed to create post" };
    }
};

// export const likePost = async (postId) => {
//   return await axios.post(`${API_URL}/posts/like/${postId}`);
// };

// export const unlike = async (postId) => {
//   return await axios.post(`${API_URL}/posts/unlike/${postId}`);
// };

// export const likePost = async (postId) => {
//   const token = localStorage.getItem("token"); // Retrieve token

//   console.log("Token being sent:", token); // Debugging

//   if (!token) {
//     console.error("No token found in localStorage!");
//     throw new Error("No token found. Please log in again.");
//   }

//   try {
//     const response = await axios.post(
//       `http://localhost:5000/api/posts/like/${postId}`,
//       {}, // Empty request body
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Like API Response:", response.data); // ✅ Debugging

//     return response.data; // ✅ Ensure function returns the correct response
//   } catch (error) {
//     console.error("Error in likePost function:", error.response?.data || error);
//     throw error;
//   }
// };


// export const unlike = async (postId) => {
//   const token = localStorage.getItem("token");  // 🔹 Get token from local storage

//   if (!token) {
//     throw new Error("No token found, please log in again.");
//   }

//   return await axios.post(
//     `${API_URL}/posts/unlike/${postId}`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,  // 🔹 Add token in headers
//       },
//     }
//   );
// };

// export const likePost = async (postId) => {
//   const token = localStorage.getItem("token");  // 🔹 Get token from local storage

//   return await axios.post(
//     `${API_URL}/posts/like/${postId}`,
//     {},  //  Empty body
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,  //  Add token in headers
//       },
//     }
//   );
// };

// export const likePost = async (postId) => {
//   const token = localStorage.getItem("token");  // Retrieve the token from localStorage

//   if (!token) {
//     alert("please login then like")
//     throw new Error("No token found, please log in again.");
//   }

//   try {
//     const response = await axios.post(
//       `${API_URL}/posts/like/${postId}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Attach the token in the Authorization header
//         },
//       }
//     );
//     console.log("Like Response:", response.data); // Debugging
//     return response.data;
//   } catch (error) {
//     console.error(" Like post error:", error.response?.data);
//     throw error;
//   }
// };


export const addComment = async (commentData) => {
    return await axios.post(`${API_URL}/comments/create`, commentData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  };


  export const fetchComments = async (postId) => {
    return await axios.get(`${API_URL}/comments/${postId}`);
  };




    



  export const likePost = async (postId) => {
    const token = localStorage.getItem("token"); // Retrieve token
  
    console.log("Token being sent:", token); // Log the token
  
    if (!token) {
      console.error("No token found in localStorage!");
      throw new Error("No token found. Please log in again.");
    }
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/like/${postId}`,
        {}, // Empty request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error in likePost function:", error.response?.data || error);
      throw error;
    }
  };
  
  
  
  export const unlike = async (postId) => {
    const token = localStorage.getItem("token");  // 🔹 Get token from local storage
    if (!token) {
      throw new Error("No token found, please log in again.");
    }
  
    return await axios.post(
      `${API_URL}/posts/unlike/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,  // 🔹 Add token in headers
        },
      }
    );
  };
