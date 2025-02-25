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
        
        const nodes = response.data.elements.map((element) => formatOpenStreetMapData(element));
        
        return nodes;
    } catch (error) {
        console.error('Error fetching OSM data:', error);
        return [];
    }
}

const formatOpenStreetMapData = (data) => {
    return {
        id: data.id,
        source: 'openstreetmap',
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lon),
        capacity: data.tags.capacity ? parseInt(data.tags.capacity) : null,
        covered: data.tags.covered === "yes",
        type: data.tags.type || null,
        isFree: data.tags.fee === "no" || null
    };
};


module.exports = {
    getOsmBicycleParking
};
