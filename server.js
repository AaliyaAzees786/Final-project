const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Adjust path as needed

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

app.use('/api', userRoutes); // Prefix your routes with /api or as needed

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
