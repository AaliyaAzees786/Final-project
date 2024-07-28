import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Paper } from '@mui/material';
import axios from 'axios'; // Ensure axios is imported

const Addbook = () => {
  const [newBook, setNewBook] = useState({
    id: '',
    title: '',
    author: '',
    year: '',
    genre: '',
    ISBN: '',
    img: '',
    status: 'available'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/addbook', newBook);
      alert('Book added successfully');
      setNewBook({
        id: '',
        title: '',
        author: '',
        year: '',
        genre: '',
        ISBN: '',
        img: '',
        status: 'available'
      });
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://img.freepik.com/premium-photo/blur-library-background_882595-4867.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container component="main" maxWidth="sm" sx={{ margin: '5%' }}>
        <Paper elevation={6} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#333' }}>
            Add New Book
          </Typography>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              label="Book Id"
              name="id"
              value={newBook.id}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Book Title"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Author"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Book Year"
              name="year"
              value={newBook.year}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Genre"
              name="genre"
              value={newBook.genre}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="ISBN"
              name="ISBN"
              value={newBook.ISBN}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Image Link"
              name="img"
              value={newBook.img}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Status"
              name="status"
              value={newBook.status}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value="available">Available</option>
              <option value="rented">Rented</option>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Book
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Addbook;
