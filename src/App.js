import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Write from './pages/write/Write';
import SinglePost from './pages/singlePost/SinglePost';
import Profile from './pages/profile/Profile';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  return (
    <>
      <Router>
        <Topbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='posts' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route
            path='profile/:userId'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='write'
            element={
              <PrivateRoute>
                <Write />
              </PrivateRoute>
            }
          />
          <Route
            path='posts/:postId'
            element={
              <PrivateRoute>
                <SinglePost />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

const PrivateRoute = ({ children }) => {
  const { user } = useContext(Context);
  return user ? children : <Navigate to='/login' />;
};

export default App;
