import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}/1`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  function createPost() {
    axios
      .post(baseURL, {
        title: "Hello World!",
        body: "This is a new post.",
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  function updatePost() {
    axios
      .put(`${baseURL}/1`, {
        title: "Updated Hello World!",
        body: "This is an updated post.",
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  function deletePost() {
    axios.delete(`${baseURL}/1`).then(() => {
      alert("Are you sure?");
      setPost(null);
    });
  }

  // if (!post) return "DELETED!!!!";
  if (error) return `Error: ${error.message}`;
  if (!post) return "Loading...";

  return (
    <div>
      <h1>The Galaxy News</h1>
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <button onClick={createPost}>Create Post</button>
        <button onClick={updatePost}>Update Post</button>
        <button onClick={deletePost}>Delete Post</button>
      </div>
    </div>
  );
}
