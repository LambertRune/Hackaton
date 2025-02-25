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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
