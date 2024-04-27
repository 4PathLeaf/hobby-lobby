import React from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import './PostList.css';

const PostList = ({ posts }) => {
  return (
    <div className="post-list-container">
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <Post post={post} />
          <div className="post-footer">
            <div className="upvote-count">{post.upvotes} Upvotes</div>
            <Link to={`/post/${post.id}`} className="view-post-link">
              View Post
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
