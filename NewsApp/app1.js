const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Sample API URL for demonstration purposes
const apiKey = 'ab3e9dfd33cc4f57a641962b43fc8a40';
const apiUrl = 'http://newsapi.org/v2/top-headlines'; // Replace with the actual API URL
const country = 'us'; // Change this to your desired country code
const pageSize = 30; 

// Route to handle the /news request
app.get('/news', (req, res) => {
  const selectedCategory = req.query.category || 'technology'; // Default to technology
  const apiURLWithCategory = `${apiUrl}?category=${selectedCategory}`;
  const requestOptions = {
    params: {
        country,
        category,
        pageSize,
        apiKey,
    };

  // Fetch news data from the external API using axios
  axios.get(apiURLWithCategory)
    .then(response => {
      const newsData = response.data; // The response data from the external API (assuming it's already in plain text format)
      res.type('text'); // Set the response content type to plain text
      res.send(newsData); // Sending the plain text response
    })
    .catch(error => {
      console.error('Error fetching news:', error.message);
      res.send('Error fetching news');
    });
});

// Route to render the EJS template
app.get('/', (req, res) => {
  res.render('index', { title: 'News App' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
