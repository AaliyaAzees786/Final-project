import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import './Navbar.css';

function Navbar() {
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
            sx={{ flexGrow: 1, color:'white' }}
          >
          <MenuBookIcon sx={{ fontSize: 50 }}/>    DIGITAL LIBRARY
          </Typography>
          <div>
          <Link to={'/'}><Button
          variant='filled'
          color='inherit'
            sx={{
              color: 'white',
              borderRadius: '8px',
              margin: '0 8px',
            }}
          >
      <HomeIcon sx={{ fontSize: 40 }} />
          </Button></Link>
          <Link to={'/login'}><Button
          color='primary'
          variant='contained'
            sx={{
              color: 'white',
              borderRadius: '8px',
              margin: '0 8px',
            }}
          >
            Login/Signup
          </Button></Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;

