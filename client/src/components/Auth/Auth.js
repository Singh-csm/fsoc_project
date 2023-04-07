import React, { useState} from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import { signin, signup } from "../../actions/auth";

const initialState = { firstName:"" , lastName: "" , email: "",  password: "", confirmPassword: "" };

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history))
        }else{
            dispatch(signin(formData, history))
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false)
    }

    
    const googleSuccess = async (res) => {
        console.log(res)
        const result = res?.profileObj;
        const token = res?.tokenId; 
        try {
            dispatch({ type: "AUTH", data: { result, token}});
            history.push("/")
        } catch (error) {
            console.log(error)
        }

    }
    const googleFailure =  () => {
        console.log("Google SigIn was unsuccessful. Please try again");
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={17}>
              <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">{ isSignup ? "Sign Up" : "Sign In" }</Typography>
              <form className={classes.form} onSubmit={handleSubmit} > 
                    <Grid container spacing={2}>
                       {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                      { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignup ? "Sign Up": "Sign In"}
                    </Button>
                    <GoogleLogin 
                        clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignup ? "Already have an account? : Sign In": "Don't have an account? : Sign Up" }
                                </Button>
                            </Grid>

                    </Grid>
              </form>

        </Paper>
 


        </Container>
  )
}

export default Auth; 
