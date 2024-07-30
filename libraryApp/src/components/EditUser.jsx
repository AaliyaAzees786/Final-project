import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

const EditUser = () => {

  const location=useLocation()
  function valueFetch(e){
    setForm({...form,[e.target.name]:e.target.value})
    console.log(form.data);
  }

  function valueAdd(){
    if(location.state!=null){
      axios.put('http://localhost:4000/movieedit/'+location.state.val._id,form).then((res)=>{
        alert('Data updated!');
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  useEffect(()=>{
    if(location.state!=null){
      setForm({...form,
        Name:location.state.val.Name,
        Place:location.state.val.Place,
        Age:location.state.val.Age,
        Education:location.state.val.Education,
        PhoneNumber:location.state.val.PhoneNumber
    })
    }
  },[])
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
          marginTop: '5%',
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
            <TextField
              required
              id="name"
              name="Name"
              label="Name"
              fullWidth
              margin="normal"
            />
            <TextField
              id="place"
              name="Place"
              label="Place"
              multiline
              maxRows={4}
              fullWidth
              margin="normal"
            />
            <TextField
              id="age"
              name="Age"
              label="Age"
              multiline
              maxRows={4}
              fullWidth
              margin="normal"
            />
            <TextField
              id="education"
              name="Education"
              label="Education"
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
              fullWidth
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginTop: '1rem' }}
              type="submit"
            >
              Update
            </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditUser;
