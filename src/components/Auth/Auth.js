import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';

import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from'jwt-decode';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Icon from './icon';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import Input from './Input';
import {signup, signin} from '../../actions/auth';

const initialState={firstName: '', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setSignup] = useState(false);
  const [formData, setFormData]= useState(initialState);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignup){
      dispatch(signup(formData, navigate))
    }else{
        dispatch(signin(formData, navigate))
    }
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const switchMode = () => {
    setSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
  
  
    const result=jwt_decode(res?.credential);
    const token=res?.credential;
      
    try{
      dispatch({type: 'AUTH', data:{result, token}});
      navigate('/');
    }catch(error){
      console.log(error)
    };
    // console.log('Google sign in was successfull!!')
  }

  const googleFailure = () => {
    console.log("Google sign in was unsuccsessful. Try Again Later")
  }

 

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="last Name" handleChange={handleChange} half />
                </>
              )}
            <Input name="email" label="email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="repeat password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            render={(renderProps) => (
              <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />

          <Grid container justifyContent="flex-end" >
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already  have an account> Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

    </Container>
  )
}

export default Auth;
