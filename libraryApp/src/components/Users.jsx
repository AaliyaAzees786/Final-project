import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './Home.css';

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
                navigate('/login');
            } else {
                console.error('Error fetching user data:', error);
            }
        }
    };

    fetchUserData();
}, [navigate]);

  const handleReadMoreClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const truncateText = (text, isExpanded) => {
    return isExpanded || text.length <= 20 ? text : `${text.substring(0, 15)}...`;
  };

  const handleRentClick = async (bookId) => {
    try {
      await axios.post(`http://localhost:3000/rent/${bookId}`);
      console.log('Book rented successfully!');
      notifyAdmin(bookId);
    } catch (error) {
      console.error('Error renting book:', error);
    }
  };

  const notifyAdmin = async (userId, bookId) => {
    try {
        // Fetch user and book details from the database
        const userResponse = await axios.get(`http://localhost:3000/user/${userId}`);
        const bookResponse = await axios.get(`http://localhost:3000/book/${bookId}`);
        const user = userResponse.data;
        const book = bookResponse.data;

        // Create a notification message
        const message = `User ${user.name} (ID: ${user.id}) has rented the book "${book.title}" (ID: ${book.id}).`;

        // Log the notification to the database (assuming you have a notifications endpoint)
        await axios.post('http://localhost:3000/notifications', {
            userId: user.id,
            bookId: book.id,
            message,
            timestamp: new Date().toISOString()
        });

        // Optionally, send an email to the admin
        await sendEmailToAdmin(user.email, message);

        console.log(`Admin notified: ${message}`);
    } catch (error) {
        console.error('Error notifying admin:', error);
    }
};

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='home-container'>
      <Box sx={{ flexGrow: 1, margin: '5%' }}>
        <h1 style={{fontFamily:'cursive', color:'antiquewhite', textAlign:'center', fontStyle:'italic'}}>Welcome, user!</h1>
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
                <Link to={`/book/${row.id}`}><button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate(`/books/${row.id}`)}
                  >
                    Details
                  </button></Link>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleRentClick(row.id)}
                  >
                    Rent
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
