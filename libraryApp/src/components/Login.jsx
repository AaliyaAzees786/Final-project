import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, CardMedia, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.get('http://localhost:3000/user', form);
        alert('Login successful');
        // Store the JWT in localStorage
        localStorage.setItem('token', response.data.token);
        // Navigate to the user page
        navigate('/users');
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        } else {
            console.error('Error during login:', error);
        }
    }
};

  const valueCap = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const valueAdd = () => {
    console.log(form);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'url(https://img.freepik.com/premium-photo/blur-library-background_882595-4867.jpg) no-repeat center center/cover' 
    }}>
      <Card sx={{ 
        maxWidth: 400, 
        p: 2, 
        borderRadius: 3, 
        border: '1px solid rgba(255, 255, 255, 0.2)', 
        background: 'rgba(255, 255, 255, 0.1)', 
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', 
        backdropFilter: 'blur(10px)', 
        WebkitBackdropFilter: 'blur(10px)' 
      }}>
        {/* <CardMedia
          component="img"
          alt="Library"
          height="200"
          image="https://th.bing.com/th/id/OIP.F977i9e7dMrznvOT8q8azgHaEf?w=311&h=188&c=7&r=0&o=5&dpr=2.2&pid=1.7"
          sx={{ borderRadius: 1 }}
        /> */}
        <h2 style={{ textAlign: 'center', color: '#3f51b5', margin: '20px 0' }}><i>LOGIN</i></h2>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            required
            label="Username / Email Id"
            name="user"
            onChange={valueCap}
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            name="pass"
            required
            onChange={valueCap}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Link to="/users">
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          fullWidth 
          sx={{ mb: 2, backgroundColor: 'lightgreen', color: 'black', fontWeight: 'bold', ':hover': { backgroundColor: 'green' } }}
        >
          LOGIN
        </Button></Link>
        <Link to="/signup">
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ mb: 2, backgroundColor: 'blueviolet', color: 'white', fontWeight: 'bold', ':hover': { backgroundColor: 'purple' } }}
          >
            SIGN UP
          </Button>
        </Link>
        <Button 
          href="#" 
          fullWidth 
          sx={{ color: 'red', textDecoration: 'underline', fontWeight: 'bold' }}
        >
          Forgot password?
        </Button>
      </Card>
    </div>
  );
};

export default Login;
