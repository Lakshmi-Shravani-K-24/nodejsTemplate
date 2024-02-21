const express = require('express');
const router = express.Router();
const {createBattery, getBattery, updateBattery, deleteBattery} = require('../batteryOperations');

// Route to create a battery
router.post('/', async (req, res) => {
  try {
    const result = await createBattery(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});


// Route to get batteries
router.get('/', async (req, res) => {
  try {
    const result = await getBattery(req.query);
    res.json(result);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// Route to update a battery
router.put('/:id', async (req, res) => {
  try {
    const filter = {_id: req.params.id};
    const update = req.body;
    const result = await updateBattery(filter, update);
    res.json(result);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// Route to delete a battery
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteBattery(req.params.id);
    if (!result) {
      res.status(404).json({message: 'Battery not found'});
    } else {
      res.json({message: 'Battery deleted successfully'});
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
