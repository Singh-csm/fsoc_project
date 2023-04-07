import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";


const App = () => {


  return (
    
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />

          <Switch>
            <Route exact path="/"  component={Home} />
            <Route exact path="/auth"  component={Auth} />
          </Switch>

        
      </Container>
    </BrowserRouter>
  
    
  );
};

export default App;
