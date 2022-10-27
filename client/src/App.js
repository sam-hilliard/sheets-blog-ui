import React from 'react'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PostListPage from './components/Pages/PostListPage'
import StatusPage from './components/Pages/StatusPage'
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
            <Route path="publish" element={<EditPost />} />
            <Route path="/status/:status">
              <Route index element={<StatusPage />} />
              <Route path=":id" element={<StatusPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
