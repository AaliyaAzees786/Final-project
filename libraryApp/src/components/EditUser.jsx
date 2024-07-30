import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const EditUser = () => {
  // const [id,setId]=useState('');
  const [form, setForm] = useState({
    Role:'User',
    Name: '',
    Place: '',
    Age: '',
    EmailId: '',
    Education: '',
    PhoneNumber: '',
    Username: '',
    Password: '',
    Cpass: '',
  });
  
  // const uid='demo';
  // const location=useLocation()
  // console.log(location.pathname);
  const { id } = useParams();
  console.log(id);

  function valueFetch(e){
    setForm({...form,[e.target.name]:e.target.value})
    console.log(form);
  }
  
  function update(){
    axios.put('http://localhost:3000/useredit/'+id,form).then((res)=>{
      alert('Data updated!');
    }).catch((error)=>{
      console.log(error);
    })
  }
  
  useEffect(()=>{
    
    axios.get('http://localhost:3000/user').then((res) => {
      const uone = res.data.find(row=>row._id == id);
      console.log(uone);
      // setId(uone._id);
      console.log(id);
      setForm({...form,
        Name:uone.Name,
        Place:uone.Place,
        Age:uone.Age,
        EmailId:uone.EmailId,
        Education:uone.Education,
        PhoneNumber:uone.PhoneNumber,
        Username: uone.Username,
        Password: uone.Password,
        Cpass: uone.Cpass
      })
          // setForm(res.data)
    })
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
            backgroundColor:'white',
            // background: 'rgba(255, 255, 255, 0.1)',
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
              value={form.Name}
              onChange={valueFetch}
              fullWidth
              margin="normal"
              />
            <TextField
              id="place"
              name="Place"
              label="Place"
              multiline
              maxRows={4}
              value={form.Place}
              onChange={valueFetch}
              fullWidth
              margin="normal"
              />
            <TextField
              id="age"
              name="Age"
              label="Age"
              multiline
              onChange={valueFetch}
              value={form.Age}
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
              onChange={valueFetch}
              value={form.Education}
              fullWidth
              margin="normal"
              />
            <TextField
              required
              id="phone"
              name="PhoneNumber"
              label="Phone no."
              value={form.PhoneNumber}
              fullWidth
              onChange={valueFetch}
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={update}
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
