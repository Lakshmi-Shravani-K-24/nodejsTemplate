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
  try {
    const newBattery = await Battery.create(batteryData);
    return newBattery;
  } catch (error) {
    return {error: `Failed to create battery: ${error.message}`};
  }
}

async function findBatteryById(batteryId) {
  if (validateBatteryId(batteryId)) {
    return {error: 'Invalid battery ID'};
  }
  try {
    const battery = await Battery.findOne({batteryId});
    return battery;
  } catch (error) {
    return {error: `Failed to find battery: ${error.message}`};
  }
}
async function updateBattery(batteryId, updateData) {
  if (validateBatteryId(batteryId)) {
    return {error: 'Invalid battery ID'};
  }
  try {
    const updatedBattery = await Battery.findOneAndUpdate({batteryId}, updateData, {new: true});
    return updatedBattery;
  } catch (error) {
    return {error: `Failed to update battery: ${error.message}`};
  }
}
async function deleteBattery(batteryId) {
  if (validateBatteryId(batteryId)) {
    return {error: 'Invalid battery ID'};
  }
  try {
    await Battery.deleteOne({batteryId});
    return {success: true};
  } catch (error) {
    return {error: `Failed to delete battery: ${error.message}`};
  }
}

module.exports = {createBattery, findBatteryById, updateBattery, deleteBattery};
