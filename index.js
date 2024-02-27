const Battery = require('./BatterySchema');

function createBattery(batteryData) {
  // Input validation
  if (!batteryData || Object.keys(batteryData).length === 0) {
    throw new Error('Battery data is required');
  }
  return Battery.create(batteryData)
      .then((newBattery) => newBattery);
}

function findBatteryById(batteryId) {
  // Input validation
  if (!batteryId || batteryId.trim() === '') {
    throw new Error('Battery ID is required');
  }
  return Battery.findOne({batteryId})
      .then((battery) => battery);
}

function updateBattery(batteryId, updateData) {
  // Input validation
  if (!batteryId || batteryId.trim() === '') {
    throw new Error('Battery ID is required');
  }
  return Battery.findOneAndUpdate({batteryId}, updateData, {new: true})
      .then((updatedBattery) => updatedBattery);
}

function deleteBattery(batteryId) {
  // Input validation
  if (!batteryId || batteryId.trim() === '') {
    throw new Error('Battery ID is required');
  }
  return Battery.deleteOne({batteryId})
      .then((result) => {
        if (result.deletedCount === 1) {
          return 'Battery deleted successfully';
        }
      });
}

module.exports = {createBattery, findBatteryById, updateBattery, deleteBattery};
