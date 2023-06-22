import React, { useEffect, useState } from "react";

import Image from "../../../components/Image/Image";
import "./SinglePost.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const SinglePost = ({ userId, token }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const { postId } = useParams();

  useEffect(() => {
    async function fetchPost() {
      const response = await axios.get(`/feed/post/${postId}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return response;
    }
    fetchPost().then((res) => {
      if (res.status !== 200) {
        throw new Error("Failed to fetch status");
      }
      // Retrieved the post with postId
      const post = res.data.post;
      console.log(post);
      setTitle(post.title);
      setAuthor(post.creator.name);
      setDate(new Date(post.createdAt).toLocaleDateString("en-US"));
      setImage(`http://localhost:8080/${post.imageUrl}`);
      setContent(post.content);
      setStatus(post.creator.status);
    });
  }, [postId]);

  return (
    <section className="single-post">
      <h1>{title}</h1>
      <h2>
        Created by {status} {author} on {date}
      </h2>
      <div className="single-post__image">
        <Image contain imageUrl={image} />
      </div>
      <p>{content}</p>
    </section>
  );
};

export default SinglePost;
