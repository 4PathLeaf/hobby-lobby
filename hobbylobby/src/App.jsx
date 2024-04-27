import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePostForm from './components/CreatePostForm';
import PostDetail from './pages/PostDetail';
import EditPostForm from './pages/EditPostForm'; // Import the EditPostForm component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePostForm />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<EditPostForm />} /> {/* Add route for editing posts */}
      </Routes>
    </Router>
  );
};

export default App;
