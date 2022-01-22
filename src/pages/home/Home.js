import Posts from '../../components/posts/Posts';
import './home.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';

export const Welcome = () => {
  return (
    <div className='container flex justify-center align-center flex-column height-90'>
      <h1>Welcome to Social App</h1>
      <h3>
        Please <Link to={'/login'}>Login</Link> to continue
      </h3>
    </div>
  );
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://localhost:5000/posts');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      {user ? (
        <div className='home container flex'>
          <Posts posts={posts} />
        </div>
      ) : (
        <Welcome />
      )}
    </>
  );
};

export default Home;
