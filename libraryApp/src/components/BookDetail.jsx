import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [book, setBook] = useState({}); // Use null for the initial state
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    axios.get('http://localhost:3000/book/:id')
      .then((res) => {
        setBook(res.data); // Set the single book object
      })
      .catch((err) => {
        console.error('Error fetching book data:', err);
        setError('Error fetching book data'); // Set error state
      });
  }, [id]);

  if (error) {
    return <Typography variant="h5">Error: {error}</Typography>;
  }

  if (!book) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <div style={{ alignContent: 'center', marginLeft: '30%' }}>
      <Card sx={{ minWidth: 275, marginTop: '18%', width: '50%', display: 'flex' }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Name: {book.title}
          </Typography>
          <Typography variant="h6" component="div">
            Author: {book.author}
          </Typography>
          <Typography variant="h6" component="div">
            Year: {book.year}
          </Typography>
          <Typography variant="h6" component="div">
            Genre: {book.genre}
          </Typography>
          <Typography variant="h6" component="div">
            ISBN Number: {book.ISBN}
          </Typography>
          <Typography variant="body1">
            Image Link: {book.img}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetail;
