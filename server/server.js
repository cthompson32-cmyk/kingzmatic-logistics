const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/customers', require('./routes/customers'));
app.use('/api/shipments', require('./routes/shipments'));


// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Kingzmatic Logistics API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});