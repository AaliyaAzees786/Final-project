// src/components/Home.js

// import axios from 'axios';
import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [rows, setRows] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/book').then((res) => {
      setRows(res.data);
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user');
            setUserData(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Unauthorized, redirect to login
                navigate('/login');
            } else {
                console.error('Error fetching user data:', error);
            }
        }
    };

    fetchUserData();
}, [navigate]);

if (!userData) {
    return <div>Loading...</div>;
}

  const handleReadMoreClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const truncateText = (text, isExpanded) => {
    return isExpanded || text.length <= 20 ? text : `${text.substring(0,15)}...`;
  };

  return (
    <div className='home-container'>
      <Box sx={{ flexGrow: 1, margin: '5%' }}>
        <h1 style={{fontFamily:'cursive', color:'antiquewhite',textAlign:'center', fontStyle:'italic'}}>Welcome, user!</h1>
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
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleReadMoreClick(index)}>
                    Details
                  </button>
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
