import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Write from './pages/write/Write';
import SinglePost from './pages/singlePost/SinglePost';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <>
      <Router>
        <Topbar />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='posts' element={<Home />}>
            <Route path=':postId' element={<SinglePost />} />
          </Route>
          <Route path='write' element={<Write />} />
          <Route path='profile/:userId' element={<Profile />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
