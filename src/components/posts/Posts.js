import Post from '../post/Post';
import './posts.css';

const Posts = ({ posts }) => {
  return (
    <div className='col posts'>
      <h3>POSTS</h3>
      <div className='grid'>
        {posts.map((p) => (
          <Post post={p} key={p._id} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
