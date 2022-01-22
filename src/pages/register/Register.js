import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const api_url = process.env.REACT_APP_API_URL;

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
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
    if (!user.username || !user.email || !user.password) setError(true);
    else {
      try {
        const res = await axios.post(`${api_url}/auth/register`, user);
        res.data && navigate('/login');
      } catch (err) {
        // setMessage(err.response);
        console.log(err.response);
      }
    }
  };

  return (
    <div className='container height-90 flex justify-center align-center'>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Register</h3>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            value={user.username}
            name='username'
            id='username'
            placeholder='Enter username'
            className='form-control'
            onChange={handleChange}
          />
        </div>
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
          <button className='form-control btn' type='submit'>
            Login
          </button>
        </div>
        {error && <p>All fields are required!</p>}
        {message}
      </form>
    </div>
  );
};

export default Register;
