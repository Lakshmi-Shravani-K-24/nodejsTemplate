const Battery = require('./BatterySchema');

// Validation function to check if battery data or ID is empty or invalid
function validateBatteryData(data) {
  return !data || Object.keys(data).length === 0;
}
function validateBatteryId(id) {
  return !id || typeof id !== 'string' || id.trim() === '';
}

async function createBattery(batteryData) {
  if (validateBatteryData(batteryData)) {
    return {error: 'Invalid battery data'};
  }
  const newBattery = await Battery.create(batteryData);
  return newBattery;
}

async function findBatteryById(batteryId) {
  if (validateBatteryId(batteryId)) {
    return {error: 'Invalid battery ID'};
  }
  const battery = await Battery.findOne({batteryId});
  return battery;
}

async function updateBattery(batteryId, updateData) {
  if (validateBatteryId(batteryId)) {
    return {error: 'Invalid battery ID'};
  }
  const updatedBattery = await Battery.findOneAndUpdate({batteryId}, updateData, {new: true});
  return updatedBattery;
}

async function deleteBattery(batteryId) {
  if (validateBatteryId(batteryId)) {
    return {error: 'Invalid battery ID'};
  }
  await Battery.deleteOne({batteryId});
  return {success: true};
}

module.exports = {createBattery, findBatteryById, updateBattery, deleteBattery};
