import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import './Admin.css';


const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user');
      const nonAdminUsers = response.data.filter(user => user.Role.toLowerCase() !== 'admin');
      setUsers(nonAdminUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/removeuser/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleBlockUser = async (id) => {
    try {
      await axios.put(`http://localhost:3000/user/${id}`, { status: 'blocked' });
      setUsers(users.map(user => user.id === id ? { ...user, status: 'blocked' } : user));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  return (
    <div className='manageuContainer'>
    <Box sx={{ padding: 4, maxWidth: '1200px', margin: '0 auto', backgroundColor: '#F9F9F9', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{marginTop:'5%'}}>
        Manage Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.Username}</TableCell>
                <TableCell>{user.EmailId}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteUser(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleBlockUser(user.id)}>
                    <BlockIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </div>
  );
};

export default ManageUsers;
