import Posts from '../../components/posts/Posts';
import './home.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const api_url = process.env.REACT_APP_API_URL;

export const Welcome = () => {
  return (
    <div className='container text-center flex justify-center align-center flex-column height-90'>
      <h1>Welcome to Social App</h1>
      <h3>
        Please <Link to={'/login'}>Login</Link> to continue
      </h3>
    </div>
  );
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${api_url}posts`);
      setPosts(res.data);
      setIsLoaded(true);
    };
    fetchPosts();
  }, []);
  return (
    <>
      {user ? (
        <div className='home container'>
          {isLoaded ? <Posts posts={posts} /> : <Loader />}
        </div>
      ) : (
        <Welcome />
      )}
    </>
  );
};

export default Home;
