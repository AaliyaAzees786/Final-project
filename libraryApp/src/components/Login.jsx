import axios from 'axios';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const { userType } = response.data;
      
      localStorage.setItem('userType', userType);
      // setIsLoggedIn(true);
      console.log(response.data);
      if (userType === 'admin') {
        navigate('/admin', { replace: true });
      } else if (userType === 'User') {
        axios.get('http://localhost:3000/user').then((res) => {
      const uone = res.data.find(row=>row.EmailId == email)
        navigate('/users/'+uone._id, { replace: true });
      })
      }
      else{
        console.log('INVALID USER')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        console.error('There was an error logging in!', error);
        alert('Error logging in');
      }
    }
  };


  // const user = await axios.get('http://localhost:3000/pickuser', { email });
  // console.log(user.data);


  return (
    <Box
      sx={{
        backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/2016/08/Library-HD-Background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Container component="main"  sx={{ backdropFilter: 'blur(10px)', p: 4, backgroundColor: 'rgba(255, 255, 255, 0.5)',width:700 }} >
        <Paper elevation={3} sx={{ backdropFilter: 'blur(10px)', p: 4, backgroundColor: 'rgba(255, 255, 255, 0.5)',width:600 ,marginLeft:3 }}>
          <Typography variant="h4" component="h1" sx={{ textAlign:'center', color:'green',fontFamily:'-moz-initial',  marginBottom:'2px' }}>
            <b>LOGIN</b>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ textAlign:'center' }}>
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ marginBottom:'2%' }}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ marginBottom:'2%' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginBottom:'2%' }}
            >
              Login
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            If you don't have an account? <Link to="/signup">Signup</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;