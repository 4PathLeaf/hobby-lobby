import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import './PostDetail.css'; // Import CSS for PostDetail styling

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('id', id); // Fetch comments by the post's ID
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

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
    fetchComments(); // Fetch comments when the component mounts or 'id' changes
  }, [id]);

  const handleUpvote = async () => {
    try {
      await supabase.from('posts').update({ upvotes: post.upvotes + 1 }).eq('id', id);
      setPost({ ...post, upvotes: post.upvotes + 1 });
    } catch (error) {
      console.error('Error upvoting post:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      // Fetch comments associated with the post
      const { data: commentsToDelete, error: fetchCommentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('id', id); // Fetch comments by the post's ID

      if (fetchCommentsError) {
        throw new Error('Error fetching comments: ' + fetchCommentsError.message);
      }

      // Delete each comment associated with the post
      for (const comment of commentsToDelete) {
        await supabase.from('comments').delete().eq('comment_id', comment.comment_id);
      }

      // Now delete the post
      await supabase.from('posts').delete().eq('id', id);

      // Redirect to home or show a success message
      window.location.href = '/'; // Redirect to home page after deletion

    } catch (error) {
      console.error('Error deleting post and associated comments:', error.message);
      // Handle error gracefully, show an alert, or redirect to an error page
    }
  };

  const handleAddComment = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({ id: id, comment: newComment }); // Use 'id' instead of 'post_id' for insertion

      if (error) {
        console.error('Error adding comment:', error.message);
        alert('Error adding comment: ' + error.message);
      } else {
        console.log('Comment added successfully:', data);
        setNewComment('');
        fetchComments(); // Refresh comments after adding a new comment
      }
    } catch (error) {
      console.error('Error adding comment:', error.message);
      alert('Error adding comment: ' + error.message);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-detail-container">
      <div className="post-info-container">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {post.imageURL && <img src={post.imageURL} alt="Post" />}
        <p>Upvotes: {post.upvotes}</p>
        <button className="action-button" onClick={handleUpvote}>Upvote</button>
        <button className="action-button" onClick={handleDelete}>Delete</button>
        <Link to={`/edit/${id}`} className="action-button">Edit</Link>
      </div>

      {/* Display comments */}
      <div className="comments-container">
        <h3>Comments</h3>
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.comment_id} className="comment-item">{comment.comment}</li>
          ))}
        </ul>
        {/* Add new comment form */}
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
          placeholder="Add a comment..."
        />
        <button className="action-button" onClick={handleAddComment}>Add Comment</button>
      </div>

      {/* Button to navigate back to the home page */}
      <Link to="/" className="back-to-home-link">
        Back to Home
      </Link>
    </div>
  );
};

export default PostDetail;
