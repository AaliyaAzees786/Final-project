import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import './Home.css';


const Home = () => {
  const [rows, setRows] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location=useLocation()

  console.log(location);

  // useEffect(() => {
  //     // const { name } = uone.Name;
  // }, []);

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

  const [isDisabled, setIsDisabled] = useState(false);

  const handleRentClick = async (_id) => {
    setIsDisabled((prevState) => ({ ...prevState, [_id]: true })); // Disable the button for the clicked book
    try {
      await axios.put(`http://localhost:3000/bookedit/${_id}`, { status: "Rented" });
      console.log('Book rented successfully!');
      notifyAdmin(_id); // Notify the admin with the correct _id
    } catch (error) {
      console.error('Error renting book:', error);
      setIsDisabled((prevState) => ({ ...prevState, [_id]: false })); // Re-enable the button if there's an error
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
        <br />
        <h1 style={{fontFamily:'cursive', color:'antiquewhite', textAlign:'center', fontStyle:'italic'}}>Welcome, USER !</h1>
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
                  <Typography variant='h6'>{row.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Author:</b> {row.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Genre:</b> {row.genre}
                  </Typography>
                </CardContent>
                <div className="card-actions">
                <Link to={`/book/${row.id}`}><Button
                    variant='outlined'
                    onClick={() => navigate(`/books/${row.id}`)}
                    sx = {{ marginRight:'10px' }}
                  >
                    Details
                  </Button></Link>
                  <Button
                    variant='contained'
                    key={row._id}
                    onClick={() => handleRentClick(row._id)}
          disabled={isDisabled[row._id]}
                  >
                    Rent
                  </Button>
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
