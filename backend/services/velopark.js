const axios = require('axios');
const BASE_API_URL = 'https://data.velopark.be/rich-snippets-generator/api/34000';

async function getVeloparkDetails() {
  try {
    const response = await axios.get(BASE_API_URL);
    const shedUrls = response.data;
    const shedDetails = await Promise.all(
      shedUrls.map(async (url) => {
        const details = await axios.get(url);
        return details.data;
      })
    );
    return shedDetails;
  } catch (error) {
    console.error('Error fetching Velopark data:', error);
    return [];
  }
}

module.exports = {
  getVeloparkDetails
};
