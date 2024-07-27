import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const [form, setForm] = useState({
    Name: '',
    Place: '',
    Age: '',
    Education: '',
    PhoneNumber: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state ? location.state.val._id : null;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/user/${userId}`)
        .then((res) => {
          setForm(res.data);
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const valueFetch = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const valueAdd = () => {
    axios.put(`http://localhost:3000/edituser/${userId}`, form)
      .then((res) => {
        alert('Data updated!');
        navigate('/users');
      })
      .catch((error) => {
        console.log('Error updating user data:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    valueAdd();
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
              name="Name"
              label="Name"
              value={form.Name}
              onChange={valueFetch}
              fullWidth
              margin="normal"
            />
            <TextField
              id="place"
              name="Place"
              label="Place"
              value={form.Place}
              onChange={valueFetch}
              multiline
              maxRows={4}
              fullWidth
              margin="normal"
            />
            <TextField
              id="age"
              name="Age"
              label="Age"
              type="number"
              value={form.Age}
              onChange={valueFetch}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              id="education"
              name="Education"
              label="Education"
              value={form.Education}
              onChange={valueFetch}
              multiline
              maxRows={4}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              id="phone"
              name="PhoneNumber"
              label="Phone no."
              value={form.PhoneNumber}
              onChange={valueFetch}
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
