import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';

import PostDetails from './components/PostDetais/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
const user=JSON.parse(localStorage.getItem('profile'))

  return (
   <GoogleOAuthProvider  clientId="743234492811-feci0tsiscn0a0upoa5gj8bsnifflerh.apps.googleusercontent.com">
 

    <BrowserRouter >
       <Container maxWidth="xl">
     <Navbar/>
    <Routes>

      <Route path="/" exact element={<Navigate replace to="/posts" />}/>
      <Route path='/posts' exact element={<Home/>}/>
      <Route path='/posts/search' exact element={<Home/>}/>
      <Route path="/posts/:id"  element={<PostDetails/>}/>
      <Route path="/auth" element={<Auth/>}/>
      {/* <Route path="/auth" element={( !user?<Auth/>:<Navigate replace to="/posts"/>)}/> */}
      {/* <Route path="/" e<Route path='/posts'exact component={<Home/>}/>lement={<Navigate replace to="/auth" />}></Route> */}

  </Routes>
    </Container>
    </BrowserRouter>
 </GoogleOAuthProvider>
  );
};

export default App;