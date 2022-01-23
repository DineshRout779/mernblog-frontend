import './login.css';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

const api_url = process.env.REACT_APP_API_URL;

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const { dispatch, isFetching } = useContext(Context);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setMessage(null);
    if (!user.email || !user.password) setError(true);
    else {
      dispatch({ type: 'LOGIN_START' });
      try {
        const res = await axios.post(`${api_url}auth/login`, user);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        navigate('/posts');
      } catch (err) {
        setMessage(err.response.data.error);
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    }
  };

  return (
    <div className='container height-90 flex justify-center align-center'>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            value={user.email}
            name='email'
            id='email'
            placeholder='Enter email'
            className='form-control'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={user.password}
            name='password'
            id='password'
            placeholder='Enter password'
            className='form-control'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <button
            className='form-control btn btn-submit'
            type='submit'
            disabled={isFetching}
          >
            Login
          </button>
        </div>
        {error && <p>All fields are required!</p>}
        {message}
      </form>
    </div>
  );
};

export default Login;
