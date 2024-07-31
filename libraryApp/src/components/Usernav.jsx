import { AppBar, Avatar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Navbar.css';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { blue, green } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';


const Usernav = ({ userId }) => {
  const [user, setUser] = useState([]);
  const [error,setError] = useState([]);

  const params = useParams();
  const id = userId || params.id;


  useEffect(() => {
    axios.get('http://localhost:3000/user/:id')
      .then((res) => {
        setUser(res.data); // Set the single book object
      })
      .catch((err) => {
        console.error('Error fetching book data:', err);
        setError('Error fetching book data'); // Set error state
      });
  }, []);


  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
    <AppBar
      position="fixed"
      sx={{
      //   backgroundImage: 'url(" https://images.pexels.com/photos/1187974/pexels-photo-1187974.jpeg?auto=compress&cs=tinysrgb&w=600")', // Example background image URL
        backgroundColor:'#333',
        backgroundSize: 'same',
        backgroundPosition: 'center',
        borderRadius: '12px', 
        margin: 0, 
        top:0,
        width:'100%',
        color:'white',
        pading:'1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zindex:'1000'
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, color: 'white', textShadow: '1px 1px 2px black' }}
        >
          DIGITAL LIBRARY
        </Typography>
        <div>
        <Link to={'/users/'+id}><Button
        color='primary'
        variant='outlined'
          sx={{ 
            color: 'white',
            borderRadius: '8px',
            margin: '0 8px'
          }}
        >
                <HomeIcon sx={{ fontSize: 40 }} />
        </Button></Link>
        <Link to={'/login'}><Button
        color='error'
        variant='contained'
          sx={{
            color: 'white',
            borderRadius: '8px',
            margin: '0 8px',
          }}
        >
          Logout
        </Button></Link>
        <Link to={'/edituser/'+id}><AccountCircleIcon sx={{ fontSize: 40 }}></AccountCircleIcon></Link>
        </div>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Usernav