const axios = require('axios');
const BASE_API_URL = 'https://data.velopark.be/rich-snippets-generator/api/34000';

async function getVeloparkDetails() {
    try {
        const response = await axios.get(BASE_API_URL);
        const shedUrls = response.data;
        const shedDetails = await Promise.all(
            shedUrls.map(async (url) => {
                const details = await axios.get(url);
                return formatVeloParkData(details.data);
            })
        );
        return shedDetails;
    } catch (error) {
        console.error('Error fetching Velopark data:', error);
        return [];
    }
}

const formatVeloParkData = (data) => {
    return {
        id: parseInt(data.identifier),
        source: 'velopark',
        
        latitude: data.parkingDetails.geo[0].latitude,
        longitude: data.parkingDetails.geo[0].longitude,
        capacity: data.parkingDetails.totalCapacity || null,
        isCovered: data.parkingDetails.covered || false,
        //   type: data.parkingDetails.allows?.[0]?.bicycleType?.split('#')[1] || null
        type: null,
        isFree: data.parkingDetails.priceSpecification?.[0]?.freeOfCharge || null
    };
};

module.exports = {
    getVeloparkDetails
};
