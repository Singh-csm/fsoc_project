import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from './components/PostDetails/PostDetails';


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />

          <Switch>
            <Route exact path="/"  component={() => <Redirect to="/posts" />} />
            <Route exact path="/posts"  component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
           
            <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch>

        
      </Container>
    </BrowserRouter>
  
    
  );
};

export default App;
