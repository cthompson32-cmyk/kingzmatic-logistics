const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET all shipments (with customer info)
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('shipments')
    .select('*, customers(name, email)');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET single shipment
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('shipments')
    .select('*, customers(name, email)')
    .eq('id', req.params.id)
    .single();
  if (error) return res.status(404).json({ error: 'Shipment not found' });
  res.json(data);
});

// GET shipment by tracking number
router.get('/track/:tracking_number', async (req, res) => {
  const { data, error } = await supabase
    .from('shipments')
    .select('*, customers(name)')
    .eq('tracking_number', req.params.tracking_number)
    .single();
  if (error) return res.status(404).json({ error: 'Tracking number not found' });
  res.json(data);
});

// POST create shipment
router.post('/', async (req, res) => {
  const { customer_id, tracking_number, origin, destination, weight, notes } = req.body;
  const { data, error } = await supabase
    .from('shipments')
    .insert([{ customer_id, tracking_number, origin, destination, weight, notes }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PUT update shipment status
router.put('/:id', async (req, res) => {
  const { status, origin, destination, weight, notes } = req.body;
  const { data, error } = await supabase
    .from('shipments')
    .update({ status, origin, destination, weight, notes, updated_at: new Date() })
    .eq('id', req.params.id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// DELETE shipment
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('shipments')
    .delete()
    .eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Shipment deleted' });
});

module.exports = router;