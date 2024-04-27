import React from 'react';

const Post = ({ post }) => {
  const formattedDate = new Date(post.created_at).toLocaleString(); // Format the date

  return (
    <div>
      <h2>{post.title}</h2>
      <p>Created: {formattedDate}</p> {/* Display the formatted date */}
      <p>Upvotes: {post.upvotes}</p>
      {post.imageURL && <img src={post.imageURL} alt="Post" />}
    </div>
  );
};

export default Post;
