import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import Loader from '../../components/loader/Loader';

const api_url = process.env.REACT_APP_API_URL;

const Avatar = ({ userProfile }) => {
  return (
    <div>
      {userProfile.profilePic ? (
        <img
          src={userProfile.profilePic}
          alt={userProfile.username}
          className='profile-img'
        />
      ) : (
        <div
          className='profile-img'
          style={{
            backgroundColor: '#3085f5',
            padding: '2em',
            color: 'white',
            marginRight: '1em',
          }}
        >
          DR
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const { user: currentUser, dispatch } = useContext(Context);
  const { userId } = useParams();
  const [userProfile, setProfile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${api_url}users/${userId}`);
        setProfile(res.data);
        setUserData({ ...res.data });
        setIsLoaded(true);
      } catch (err) {
        console.log(err.response);
      }
    };
    getUser();
  }, [userId]);

  const handleToggleDelete = () => {
    setIsDeleting(!isDeleting);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateUser = async () => {
    try {
      await axios.put(`${api_url}users/${currentUser._id}`, userData, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`${api_url}users/${currentUser._id}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setIsDeleting(false);
      dispatch({ type: 'LOGOUT' });
      navigate('/');
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className='container'>
      {userProfile && isLoaded ? (
        <>
          <div className='flex justify-between align-center'>
            <h2>{userId === currentUser._id ? 'My profile' : 'User'}</h2>
            {!isEditing && !isDeleting ? (
              <div>
                <button className='btn' onClick={handleToggleEdit}>
                  EDIT
                </button>
                <button className='btn btn-danger' onClick={handleToggleDelete}>
                  DELETE
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex align-center'>
            <Avatar userProfile={userProfile} />
            {isEditing ? (
              ''
            ) : (
              <div>
                <h4>{userData.username}</h4>
                <p>{userData.email}</p>
              </div>
            )}
          </div>
          {isEditing && (
            <div className='my-1'>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  id={'username'}
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      username: e.target.value,
                    })
                  }
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  value={userData.email}
                  id={'email'}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>
                  Password <small>(leave empty if don't want to change)</small>
                </label>
                <input
                  type='password'
                  value={''}
                  id={'password'}
                  placeholder={'Enter new password'}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      password: e.target.value,
                    })
                  }
                  className='form-control'
                />
              </div>
            </div>
          )}
          <div>
            {isEditing ? (
              <div className='my-1'>
                <button
                  onClick={handleToggleEdit}
                  className='btn  btn-secondary'
                >
                  CANCEL
                </button>
                <button onClick={updateUser} className='btn btn-success'>
                  SAVE
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            {isDeleting ? (
              <div className='my-1'>
                <p>Are you sure?</p>
                <button
                  onClick={handleToggleDelete}
                  className='btn btn-secondary'
                >
                  CANCEL
                </button>
                <button onClick={deleteUser} className='btn btn-danger'>
                  DELETE
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Profile;
