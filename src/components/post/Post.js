import './post.css';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  function removeTags(str) {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
  }

  return (
    <Link className='post' to={`/posts/${post._id}`}>
      {post.photo && <img src={post.photo} alt='' className='postImg' />}
      <div className='postInfo'>
        <h3>{post.title}</h3>
        <p>{removeTags(post.desc.substr(0, 100)) + '...'}</p>
        {post.categories && post.categories.length > 0 ? (
          <ul className='tags flex'>
            {post.categories.map((c, i) => (
              <li key={i} className='tag'>
                {c}
              </li>
            ))}
          </ul>
        ) : (
          'Nothing'
        )}
        <p className='time'>{new Date(post.createdAt).toDateString()}</p>
      </div>
    </Link>
  );
};

export default Post;
