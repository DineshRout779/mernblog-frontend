import './write.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL;

const Write = () => {
  const [title, setTitle] = useState('');
  const [cats, setCats] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);
  const { user } = useContext(Context);

  let categories = cats.split(',');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (!title || !body) setError(true);
    else {
      try {
        const res = await axios.post(`${api_url}/posts`, {
          title,
          desc: body,
          username: user.username,
          categories,
        });
        res.data && window.location.replace('/posts');
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            value={title}
            type='text'
            className='form-control'
            id='title'
            name='title'
            placeholder='Enter title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <ReactQuill
            theme='snow'
            value={body}
            onChange={setBody}
            style={{
              height: '300px',
            }}
            placeholder='Type something here...'
          />
        </div>
        <br />
        <br />
        <div className='form-group'>
          <label htmlFor='cats'>Categories</label>
          <input
            type='text'
            className='form-control'
            id='cats'
            value={cats}
            placeholder='Enter categories (separate by commas)'
            onChange={(e) => setCats(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='form-control btn btn-submit'>Post</button>
        </div>
        {error && <p>All fields are required!</p>}
      </form>
    </div>
  );
};

export default Write;
