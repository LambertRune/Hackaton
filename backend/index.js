const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const BASE_API_URL = 'https://data.velopark.be/rich-snippets-generator/api/34000';

// Get list of shed URLs
app.get('/api/sheds', async (req, res) => {
  try {
    const response = await axios.get(BASE_API_URL);
    const shedUrls = response.data;
    res.json(shedUrls);
  } catch (error) {
    console.error('Error fetching shed URLs:', error);
    res.status(500).send('Error fetching shed URLs');
  }
});

// Get shed details for each URL
app.get('/api/sheds/details', async (req, res) => {
  try {
    const response = await axios.get(BASE_API_URL);
    const shedUrls = response.data;
    const shedDetails = await Promise.all(
      shedUrls.map(async (url) => {
        const details = await axios.get(url);
        return details.data;
      })
    );
    res.json(shedDetails);
  } catch (error) {
    console.error('Error fetching shed details:', error);
    res.status(500).send('Error fetching shed details');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});