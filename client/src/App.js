import React from "react";
import { Container } from '@mui/material';

import { BrowserRouter, Router, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from './components/PostDetails/PostDetails';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />

          <Router>
          <Route path="/" element={<Navigate to="/posts" replace />} />
            <Route exact path="/posts"  component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" replace />} />
          </Router>

        
      </Container>
    </BrowserRouter>
  
    
  );
};

export default App;
