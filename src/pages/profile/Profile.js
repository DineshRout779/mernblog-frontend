import { useParams } from 'react-router';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';

const Profile = () => {
  const { user } = useContext(Context);
  const { userId } = useParams();
  const [userProfile, setProfile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    getUser();
  }, [userId]);

  return (
    <div className='container'>
      {user && userProfile ? (
        <>
          <h2>My profile</h2>
          <div className='flex align-center'>
            <div>
              {userProfile && userProfile.profilePic ? (
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
            <div>
              <h4>{userProfile.username}</h4>
              <p>{userProfile.email}</p>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Profile;
