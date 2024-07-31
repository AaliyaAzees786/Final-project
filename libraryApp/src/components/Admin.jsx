import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Grid } from '@mui/material';
import './Admin.css';

const Viewbooks = () => {
  return (
    <Box sx={{ padding: 4, align:'center',maxWidth: '1500px',  backgroundColor: '#F9F9F9', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ marginBottom: 4 ,marginTop:'5%'}}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Button component={Link} to="/manage-users" variant="contained" color="primary" fullWidth sx={{ padding: 2 }}>
            Manage Users
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button component={Link} to="/manage-books" variant="contained" color="secondary" fullWidth sx={{ padding: 2 }}>
            Manage Books
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Viewbooks;
