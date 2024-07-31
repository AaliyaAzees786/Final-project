import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, CardActions, CardMedia, Grid } from '@mui/material';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [book, setBook] = useState({}); // Use null for the initial state
  const [rows,setRows] = useState({});
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    axios.get('http://localhost:3000/book/'+id)
      .then((res) => {
        const bookData = res.data.find(row=>row.id == parseInt(id));
        setBook(bookData);
        console.log(bookData);
      })
      .catch((err) => {
        console.error('Error fetching book data:', err);
        setError('Error fetching book data'); // Set error state
      });
  }, [id]);

  if (error) {
    return <Typography variant="h5">Error: {error}</Typography>;
  }

  if (!rows) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <div className='pageContainer'>
    <div className='mainDiv'>

      <Grid container spacing={105} >
      <Grid item xs={3}>
      <Card sx={{ width: 800, height:500}}>
      <CardContent className='cardCont'>
        <Typography gutterBottom variant="h5" component="div">
        Name : 
        {book.title}
        </Typography>
        <Typography variant="h6" component="div">
            Author  : {book.author}
          </Typography>
          <Typography variant="h6" component="div">
            Year  : {book.year}
          </Typography>
          <Typography variant="h6" component="div">
            Genre  : {book.genre}
          </Typography>
          <Typography variant="h6" component="div">
            Description  : {book.Description}
          </Typography>
          <Typography variant="h6" component="div">
            ISBN Number  : {book.ISBN}
          </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button href='https://www.imdb.com/title/tt25400540/' size="small">Learn More</Button>
      </CardActions> */}
    </Card>
        </Grid>

    <Grid item xs={2}>
      <Card sx={{ width: 400 }}>
            <CardMedia
              sx={{ height: 550, objectFit: 'contain', alignContent:'center' }}
              image={book.img}
              title={book.title}
            /></Card>
            </Grid>
    </Grid>
    

      {/* <Card sx={{ minWidth: 275, marginTop: '18%', width: '60%', display: 'flex' ,height:'75%'}}>
        <CardMedia sx={{height: 250}}>
        <img src={book.img} alt="" />
        </CardMedia>
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
        </CardContent>
      </Card> */}
    </div>
    </div>
  );
};

export default BookDetail;
