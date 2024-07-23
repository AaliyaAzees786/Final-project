import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    place: '',
    age: '',
    email: '',
    education: '',
    phone: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state ? location.state.val : null; // Assuming userId is passed through state

  useEffect(() => {
    // Fetch the user data from your API
    if (userId) {
      axios.get(`/api/users/${userId}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the user data in your database
    axios.put(`/api/users/${userId}`, userData)
      .then(response => {
        navigate('/users'); // Navigate to the users page after successful update
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        backgroundImage: 'url(https://img.freepik.com/premium-photo/blur-library-background_882595-4867.jpg)',
      }}
    >
      <Box
        sx={{
          height: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10%',
        }}
      >
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            maxWidth: '400px',
            width: '100%',
            margin: '20px'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Edit User Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              value={userData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              id="place"
              name="place"
              label="Place"
              value={userData.place}
              onChange={handleChange}
              multiline
              maxRows={4}
              fullWidth
              margin="normal"
            />
            <TextField
              id="age"
              name="age"
              label="Age"
              type="number"
              value={userData.age}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              id="email"
              name="email"
              label="Email Id"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              id="education"
              name="education"
              label="Education"
              value={userData.education}
              onChange={handleChange}
              multiline
              maxRows={4}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone no."
              value={userData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginTop: '1rem' }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EditUser;
