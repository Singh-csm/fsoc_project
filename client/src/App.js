import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from './components/PostDetails/PostDetails';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
      <ToastContainer/>
          <Switch>
            <Route exact path="/"  component={() => <Redirect to="/posts" />} />
            <Route exact path="/posts"  component={Home} />
            <Route path="/posts/search"  component={Home} />
            <Route path="/posts/:id"  component={PostDetails} />
            <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
            <Route path="/auth"  component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch>

        
      </Container>
    </BrowserRouter>
  
    
  );
};

export default App;
