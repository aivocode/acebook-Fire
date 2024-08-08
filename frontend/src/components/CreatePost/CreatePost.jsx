import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/posts";
import { jwtDecode } from "jwt-decode";
import Box from "@mui/material/Box";
import { Button, Input } from "@mui/material";

import "./CreatePost.css";

export const CreatePost = (props) => {

  
  const [post, setPost] = useState({
    message: "",
    userId: "",
    likes: [],
  });

 
  const handlePostChange = (event) => {
  const token = localStorage.getItem("token");
    setPost({
      ...post, 
      message: event.target.value,
      userId: jwtDecode(token).user_id
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
  const token = localStorage.getItem("token");
    event.preventDefault();
    if (token) {
      try {
        // I have taken setPost to handlePostChange - add validation for an empty post.
        await createPost(token, post);
        navigate("/posts");
        props.fetchPosts();
      } catch (err) {
        console.error(err);
        navigate("/posts");
      }
    }
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <label htmlFor="create-post"></label>
        <input
          id="create-post"
          placeholder="Create a new post..."
          data-testid="tcreate-post"
          type="text"
          value={post.message}
          onChange={handlePostChange}
        />
        <Input type="submit" variant="outlined" value="Post"/>
      </form>
    </div>
  );
};

export default CreatePost;
