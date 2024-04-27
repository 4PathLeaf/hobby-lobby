import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';

const EditPostForm = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '', upvotes: 0 });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await supabase.from('posts').select('*').eq('id', id).single();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };
    fetchPost();
  }, [id]);

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
        .update(post)
        .eq('id', id);

      if (error) {
        console.error('Error updating post:', error.message);
        alert('Error updating post: ' + error.message);
      } else {
        console.log('Post updated successfully:', data);
        alert('Post updated successfully!');
      }
    } catch (error) {
      console.error('Error updating post:', error.message);
      alert('Error updating post: ' + error.message);
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} className="edit-post-form">
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
        <button type="submit">Update Post</button>
      </form>
      
      {/* Link to navigate back to the homepage */}
      <Link to="/" className="back-to-home-link">Back to Home</Link>
    </div>
  );
};

export default EditPostForm;
