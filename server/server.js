const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const supabase = require('./supabaseClient');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Kingzmatic Logistics API is running' });
});

// Test Supabase connection
app.get('/test-db', async (req, res) => {
  const { data, error } = await supabase.from('customers').select('*').limit(5);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});