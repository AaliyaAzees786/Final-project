import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Button, Typography, Box, Grid, Snackbar, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const Viewbooks = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', status: 'available' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarPosition, setSnackbarPosition] = useState({ vertical: 'bottom', horizontal: 'right' });

  useEffect(() => {
    fetchUsers();
    fetchBooks();
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

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/book');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddOrUpdateBook = async (id) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/bookedit/'+id, newBook);
      setNewBook({ title: '', status: 'Available' });
      fetchBooks();
      setSnackbarMessage('Book added/updated successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding or updating book:', error);
    }
  };
  const handleDeleteUser = async (_id) => {
     await axios.delete('http://localhost:3000/removeuser/'+_id).then((res) => {
        alert('Data deleted');
        window.location.reload()
      }).catch((error)=>{
        console.log(error)
      })
  };

  const handleBlockUser = async (id) => {
    try {
      await axios.put('http://localhost:3000/user/'+id, { status: 'blocked' });
      setUsers(users.map(user => user.id === id ? { ...user, status: 'blocked' } : user));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };


  const handleDeleteBook = async (id) => {
    await axios.delete('http://localhost:3000/removebook/'+id).then((res) => {
      alert('Data deleted');
      window.location.reload()
    }).catch((error)=>{
      console.log(error)
    })
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: '1200px', margin: '0 auto', backgroundColor: '#F9F9F9', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ marginBottom: 4 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Manage Users
          </Typography>
          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
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
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Manage Books
          </Typography>
          <form onSubmit={handleAddOrUpdateBook} style={{ marginBottom: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Book Title"
                  variant="outlined"
                  fullWidth
                  value={newBook.title}
                  onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={newBook.status}
                    onChange={e => setNewBook({ ...newBook, status: e.target.value })}
                    label="Status"
                  >
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="rented">Rented</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Update Book
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button component={Link} to="/addbook" variant="contained" color="secondary" fullWidth>
                  Add Book
                </Button>
              </Grid>
            </Grid>
          </form>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map(book => (
                  <TableRow key={book.id}>
                    <TableCell>{book.id}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.status}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDeleteBook(book._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={snackbarPosition}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <DoneAllIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Viewbooks;
