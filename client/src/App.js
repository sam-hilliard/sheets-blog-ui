import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PostListPage from './components/Pages/PostListPage'
import EditPost from './components/Pages/EditPost'

import './App.css';

function App() {
  return (
    <div className="App">
      <Container maxWidth="md" className="main-container">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<PostListPage />} />
            <Route path="edit-post/:id" element={<EditPost />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
