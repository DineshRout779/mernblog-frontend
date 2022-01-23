import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '../../components/loader/Loader';
import './singlepost.css';

const api_url = process.env.REACT_APP_API_URL;

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${api_url}posts/${postId}`);
      setPost(res.data);
      setIsLoaded(true);
    };
    getPost();
  }, [postId]);
  return (
    <div className='container'>
      {post && isLoaded ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.username}</p>
          <p className='time'>{new Date(post.createdAt).toDateString()}</p>
          <p
            className='content'
            dangerouslySetInnerHTML={{ __html: post.desc }}
          ></p>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SinglePost;
