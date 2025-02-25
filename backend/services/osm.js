const axios = require('axios');

async function getOsmBicycleParking() {
    try {
        const overpassUrl = 'https://overpass-api.de/api/interpreter';
        const overpassQuery = `
  [out:json];
  relation(2239750);
  map_to_area->.searchArea;
  (
    node["amenity"="bicycle_parking"](area.searchArea);
  );
  out body;
`;
        
        const response = await axios.post(overpassUrl, `data=${encodeURIComponent(overpassQuery)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        const nodes = response.data.elements.map((element) => ({
            id: element.id,
            latitude: element.lat,
            longitude: element.lon,
            capacity: element.tags.capacity || 'Unknown',
            covered: element.tags.covered || 'Unknown',
            type: element.tags.bicycle_parking || 'Unknown'
        }));
        
        return nodes;
    } catch (error) {
        console.error('Error fetching OSM data:', error);
        return [];
    }
}

module.exports = {
    getOsmBicycleParking
};
