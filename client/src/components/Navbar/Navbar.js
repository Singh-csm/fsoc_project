import React, { useState, useEffect } from 'react';
import {  AppBar, Avatar, Toolbar, Button, Typography} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import memoriesLogo from '../../images/memoriesLogo.png';
import logo from '../../images/logo.jpg';
import memoriesLogo1 from '../../images/img1.jpg';
import memoriesLogo2 from '../../images/img2.jpg';
import memoriesLogo3 from '../../images/img3.jpeg';
import memoriesLogo4 from '../../images/img4.jpg';
import memoriesLogo5 from '../../images/img5.jpg';
import memoriesLogo6 from '../../images/img6.jpg';
import memoriesLogo7 from '../../images/img7.jpg';
import memoriesLogo8 from '../../images/img8.jpg';
import memoriesLogo15 from '../../images/img9.jpg';
import memoriesLogo10 from '../../images/img10.jpeg';
import memoriesLogo11 from '../../images/img11.jpeg';
import memoriesLogo12 from '../../images/img12.jpeg';
import memoriesLogo13 from '../../images/img13.jpeg';
import memoriesText from '../../images/memoriesText.png';

import * as actionType from '../../constants/actionTypes';
import useStyles from "./styles";

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const logout = () =>{
        dispatch({ type: actionType.LOGOUT });
        history.push("/auth");
        setUser(null);
    }

    useEffect(()=>{
        const token = user?.token; 
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    },[location])
    
//    navbar logo and sigin and logout button
    
  return (
      <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
        <img className={classes.image} src={logo} alt="icon" height="40px" />
        <img className={classes.image} src={memoriesLogo1} alt="icon" height="40px" />
        <img className={classes.image} src={memoriesLogo2} alt="icon" height="40px" />
        <img className={classes.image} src={memoriesLogo3} alt="icon" height="40px" />
        <img className={classes.image} src={memoriesLogo4} alt="icon" height="40px" />
        <img className={classes.image} src={memoriesLogo5} alt="icon" height="40px" />
        <img className={classes.image} src={memoriesLogo6} alt="icon" height="40px" />
        <img className={classes.image} src={memoriesLogo7} alt="icon" height="40px" />
        <img className={classes.image} src={memoriesLogo8} alt="icon" height="40px" />
        <img className={classes.image} src={memoriesLogo13} alt="icon" height="40px" />
      </Link>

        <Toolbar className={classes.toolbar}>
        {user?.result ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} > {user.result.name.charAt(0)} </Avatar>
                <Typography className={classes.userName} variant='h6' > {user.result.name} </Typography>
                <Button variant="contained" className={classes.logout} color="secondary"onClick={logout} > Logout </Button>
            </div>
        ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary" > Sign In </Button>
        )}
            
        </Toolbar>
        </AppBar>
   
      
    
  )
}

export default Navbar;
