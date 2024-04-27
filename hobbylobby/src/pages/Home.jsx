import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import PostList from '../components/PostList';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await supabase
          .from('posts')
          .select('*')
          .order(sortBy, { ascending: sortOrder === 'asc' });

        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, [sortBy, sortOrder]);

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('desc');
    }
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Hobby Lobby</h1>
      
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="sort-options">
        <button onClick={() => handleSort('created_at')}>
          Sort by Created Time
        </button>
        <button onClick={() => handleSort('upvotes')}>
          Sort by Upvotes
        </button>
      </div>

      <div className="posts-container">
        {filteredPosts.length > 0 ? (
          <PostList posts={filteredPosts} />
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      <Link to="/create" className="create-post-link">
        Create Post
      </Link>
    </div>
  );
};

export default Home;
