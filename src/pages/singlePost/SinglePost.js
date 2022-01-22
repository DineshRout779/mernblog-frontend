import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './singlepost.css';

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`http://localhost:5000/posts/${postId}`);
      setPost(res.data);
    };
    getPost();
  }, [postId]);
  return (
    <div className='container'>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.username}</p>
          <p className='time'>{new Date(post.createdAt).toDateString()}</p>
          <p
            className='content'
            dangerouslySetInnerHTML={{ __html: post.desc }}
          ></p>
        </>
      )}
    </div>
  );
};

export default SinglePost;
