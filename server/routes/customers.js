const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET all customers
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('customers').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET single customer
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', req.params.id)
    .single();
  if (error) return res.status(404).json({ error: 'Customer not found' });
  res.json(data);
});

// POST create customer
router.post('/', async (req, res) => {
  const { name, email, phone, address } = req.body;
  const { data, error } = await supabase
    .from('customers')
    .insert([{ name, email, phone, address }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PUT update customer
router.put('/:id', async (req, res) => {
  const { name, email, phone, address } = req.body;
  const { data, error } = await supabase
    .from('customers')
    .update({ name, email, phone, address })
    .eq('id', req.params.id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// DELETE customer
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Customer deleted' });
});

module.exports = router;