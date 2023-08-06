const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const apiKey = 'ab3e9dfd33cc4f57a641962b43fc8a40';
const apiUrl = 'http://newsapi.org/v2/top-headlines';
const country = 'us'; // Change this to your desired country code
const pageSize = 30;   // Number of news articles to fetch

// const requestOptions = {
//     params: {
//         country,
//         pageSize,
//         apiKey,
//     }
// };

// Configure EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Route to fetch news and render it using EJS
app.get('/news', (req, res) => {    
    const category = req.query.category || 'technology'; // Default to 'technology' if no category is provided

    const requestOptions = {
        params: {
            country,
            category,
            pageSize,
            apiKey,
        }
    };
    axios.get(apiUrl, requestOptions)
        .then(response => {
            const articles = response.data.articles;
            res.render('index', { articles, title: 'News App' });
        })
        .catch(error => {
            console.error('Error fetching news:', error.message);
            res.render('error', { title: 'Error' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
