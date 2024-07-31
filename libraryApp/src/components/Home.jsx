// src/components/Home.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './Home.css';
import { Link } from 'react-router-dom';


const Home = () => {
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState([]);
  const [error,setError] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:3000/user')
      .then((res) => {
        setUser(res.data); // Set the single book object
      })
      .catch((err) => {
        console.error('Error fetching book data:', err);
        setError('Error fetching book data'); // Set error state
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/book').then((res) => {
      setRows(res.data);
    });
  }, []);

  const handleReadMoreClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const truncateText = (text, isExpanded) => {
    return isExpanded || text.length <= 20 ? text : `${text.substring(0,15)}...`;
  };

  return (
    <div className="home-container">
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://quotefancy.com/media/wallpaper/3840x2160/15478-Margaret-Fuller-Quote-Today-a-reader-tomorrow-a-leader.jpg" className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src="https://quotefancy.com/media/wallpaper/1600x900/4769713-Susan-Wiggs-Quote-You-re-never-alone-when-you-re-reading-a-book.jpg" className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src="https://quotefancy.com/media/wallpaper/3840x2160/3930780-Anthony-Kiedis-Quote-This-Life-is-More-than-Just-a-read-through.jpg" className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src="https://quotefancy.com/media/wallpaper/3840x2160/1640181-Tomie-dePaola-Quote-Reading-is-important-because-if-you-can-read.jpg" className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src="https://quotefancy.com/media/wallpaper/3840x2160/2144104-Fernando-Pessoa-Quote-Literature-is-the-most-agreeable-way-of.jpg" className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src="https://quotefancy.com/media/wallpaper/3840x2160/7991117-James-Ellis-Quote-Literature-is-the-garden-of-wisdom.jpg" className="d-block w-100" alt="..."></img>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <Box sx={{ flexGrow: 1, margin: '5%' }}>
        <Grid container spacing={3} className="card-container">
          {rows.map((row, index) => (
            <Grid item xs={3} key={index}>
              <Card className="card">
                <CardMedia
                  sx={{ height: 250 }}
                  image={row.img}
                  title={row.title}
                />
                <CardContent className="card-content">
                  <Typography gutterBottom variant="h5" component="div">
                    {truncateText(row.title, expandedCard === index)}
                    {row.title.length > 20 && (
                      <span
                        className="read-more-btn"
                        onClick={() => handleReadMoreClick(index)}
                      >
                        {expandedCard === index ? ' Show Less' : ' Read More'}
                      </span>
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {row.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Genre: {row.genre}
                  </Typography>
                </CardContent>
                <div className="card-actions">
                <Link to={`/book/${row.id}`}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleReadMoreClick(index)}>
                    Details
                  </button>
                  </Link>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
