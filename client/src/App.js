import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PostListPage from './components/Pages/PostListPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" className="main-container">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<PostListPage />} />
            <Route path="blog/:id" element={<PostListPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
