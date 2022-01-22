import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import './topbar.css';

const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className='top'>
      <div className='container'>
        <div className='flex align-center justify-between'>
          {user ? (
            <>
              <div className='flex align-center justify-between'>
                <Link to={'/posts'} className='nav-link'>
                  <h3>MernBlog</h3>
                </Link>
                <Link to={'/write'} className='nav-link'>
                  Write
                </Link>
              </div>
              <div className='flex align-center justify-between'>
                <Link to={`/profile/${user._id}`} className='nav-link'>
                  Profile
                </Link>
                <button onClick={handleLogout} className='btn'>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='flex align-center justify-between'>
                <Link to={'/'} className='nav-link'>
                  <h3>MernBlog</h3>
                </Link>
              </div>
              <div>
                <Link to={`/login`} className='nav-link'>
                  Login
                </Link>
                <Link to={`/register`} className='nav-link'>
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
