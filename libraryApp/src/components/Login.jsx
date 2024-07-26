import axios from 'axios';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { userType } = response.data;
      // alert('Welcome');
      localStorage.setItem('userType', userType);
      setIsLoggedIn(true);
      if (userType === 'admin') {
        navigate('/adminpage', { replace: true });
      } else {
        navigate('/userview', { replace: true });
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

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://img.freepik.com/premium-photo/blur-library-background_882595-4867.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ backdropFilter: 'blur(10px)', p: 4, backgroundColor: 'rgba(255, 255, 255, 0.5)' }} >
        <Paper elevation={3} sx={{ backdropFilter: 'blur(10px)', p: 4, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          <Typography variant="h4" component="h1" sx={{ textAlign:'center', color:'green',  marginBottom:'2px' }}>
            LOGIN
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
