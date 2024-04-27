import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import './CreatePostForm.css'; // Import the CSS file for styling

const CreatePostForm = () => {
  const [post, setPost] = useState({ title: '', content: '', upvotes: 0 });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([post]);

      if (error) {
        console.error('Error creating post:', error.message);
        alert('Error creating post: ' + error.message);
      } else {
        console.log('Post created successfully:', data);
        alert('Post created successfully!');
        
        // Clear form fields after successful submission
        setPost({ title: '', content: '', upvotes: 0 });

        // Navigate back to the homepage after creating the post
        window.location.href = "/"; // Directly set the URL for navigation
      }

    } catch (error) {
      console.error('Error creating post:', error.message);
      alert('Error creating post: ' + error.message);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      <div className="create-post-form-container">
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* 'upvotes' is set to 0 by default, no need for user input */}
          <input
            type="hidden"
            name="upvotes"
            value={post.upvotes}
            onChange={handleInputChange}
          />
          <button type="submit">Create Post</button>
        </form>
      </div>

      {/* Link to navigate back to the homepage */}
      <Link to="/" className="back-to-home-link">Back to Home</Link>
    </div>
  );
};

export default CreatePostForm;
