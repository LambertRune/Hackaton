const express = require('express');
const cors = require('cors');
const veloparkService = require('./services/velopark');
const osmService = require('./services/osm');

const app = express();
app.use(cors());
app.use(express.json());

// Get details from Velopark
app.get('/api/details/velopark', async (req, res) => {
  const details = await veloparkService.getVeloparkDetails();
  res.json(details);
});

// Get details from OpenStreetMap
app.get('/api/details/openstreetmap', async (req, res) => {
  const details = await osmService.getOsmBicycleParking();
  res.json(details);
});

// Get details from all providers
app.get('/api/details/all', async (req, res) => {
  const veloparkDetails = await veloparkService.getVeloparkDetails();
  const osmDetails = await osmService.getOsmBicycleParking();
  const allDetails = [...veloparkDetails, ...osmDetails];
  res.json(allDetails);
});

app.post('/login', async (req, res) => {
 const user = {
  name: req.body.username
 }
 if(user.name == "Gilles"){
  res.status(200).json({message: "Login succes"})
 } else {
  res.status(401).json({message: "Login fout"})
 }
 res.end();
});


app.get('/api/filter/all', async (req, res) => {
    // Access query parameters
    const filterIsCovered = Boolean(req.query.isCovered);
    const filterIsFree = Boolean(req.query.isFree);
    const filterType = req.query.type || false;
    const filterMinCapacity = req.query.minCapacity || false;

    const veloparkDetails = await veloparkService.getVeloparkDetails();
    const osmDetails = await osmService.getOsmBicycleParking();
    const allDetails = [...veloparkDetails, ...osmDetails];

    const output = allDetails.filter(a => {
        if (filterIsCovered && !a.isCovered) {return false;}
        if (filterIsFree && !a.isFree) {return false;}
        if (filterType && a.type !== filterType) {return false;}
        if (filterMinCapacity && a.capacity < parseInt(filterMinCapacity)) {return false;}
        return true; // All checks pass
    });

    res.json(output);
});

// app.get('/api/filter/:provider', async (req, res) => {
//     const { provider } = req.params;
//     const filters = req.query;

//     let data = [];
//     if (provider === 'openstreetmap' || provider === 'all') {
//         data = data.concat(await osmService.getOsmBicycleParking());
//     }
//     if (provider === 'velopark' || provider === 'all') {
//         data = data.concat(await veloparkService.getVeloparkDetails());
//     }

//     // Apply filters
//     const filteredData = data.filter(item => {
//         return Object.entries(filters).every(([key, value]) => {
//             if (key === 'isCovered' || key === 'isFree') {
//                 return item[key] === (value === 'true');
//             }
//             if (key === 'minCapacity') {
//                 return item[key] !== null && parseInt(item[key]) >= parseInt(value);
//             }
//             return item[key]?.toString() === value;
            
//         });
//     });

//     res.json(filteredData);
// });


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
