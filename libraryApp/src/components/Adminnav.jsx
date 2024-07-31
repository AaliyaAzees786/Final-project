import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
import HomeIcon from '@mui/icons-material/Home';


const Usernav = () => {
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
          sx={{ flexGrow: 1, color: 'grey', textShadow: '1px 1px 2px black' }}
        >
          DIGITAL LIBRARY
        </Typography>
        <div>
        <Link to={'/'}><Button
          sx={{
            // backgroundColor: 'rgba(255, 69, 0, 0.8)', 
            color: 'white',
            borderRadius: '8px',
            margin: '0 8px',
            '&:hover': {
              // backgroundColor: 'rgba(255, 69, 0, 1)',
            },
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', 
          }}
        >
        <HomeIcon sx={{ fontSize: 40 }} />

        </Button></Link>
        <Link to={'/login'}><Button
          sx={{
            backgroundColor: 'rgba(60, 179, 113, 0.8)', 
            color: 'white',
            borderRadius: '8px',
            margin: '0 8px',
            '&:hover': {
              backgroundColor: 'rgba(60, 179, 113, 1)', 
            },
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', 
          }}
        >
          Logout
        </Button></Link>
        </div>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Usernav