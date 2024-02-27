/* eslint-disable complexity */
const Battery = require('./BatterySchema');

async function createBattery(batteryData) {
  if (!batteryData || Object.keys(batteryData).length === 0) {
    return {error: 'Invalid battery data'};
  }

  const newBattery = await Battery.create(batteryData);
  return newBattery;
}

async function findBatteryById(batteryId) {
  if (!batteryId || typeof batteryId !== 'string' || batteryId.trim() === '') {
    return {error: 'Invalid battery ID'};
  }

  const battery = await Battery.findOne({batteryId});
  return battery;
}

async function updateBattery(batteryId, updateData) {
  if (!batteryId || typeof batteryId !== 'string' || batteryId.trim() === '') {
    return {error: 'Invalid battery ID'};
  }

  const updatedBattery = await Battery.findOneAndUpdate({batteryId}, updateData, {new: true});
  return updatedBattery;
}

async function deleteBattery(batteryId) {
  if (!batteryId || typeof batteryId !== 'string' || batteryId.trim() === '') {
    return {error: 'Invalid battery ID'};
  }

  await Battery.deleteOne({batteryId});
  return {success: true};
}

module.exports = {createBattery, findBatteryById, updateBattery, deleteBattery};
