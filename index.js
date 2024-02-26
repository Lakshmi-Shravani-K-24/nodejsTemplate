const Battery = require('./BatterySchema');

async function createBattery(batteryData) {
  try {
    const newBattery = await Battery.create(batteryData);
    return newBattery;
  } catch (error) {
    throw new Error(`Failed to create battery: ${error.message}`);
  }
}

async function findBatteryById(batteryId) {
  try {
    const battery = await Battery.findOne({batteryId});
    return battery;
  } catch (error) {
    throw new Error(`Failed to find battery: ${error.message}`);
  }
}

async function updateBattery(batteryId, updateData) {
  try {
    const updatedBattery = await Battery.findOneAndUpdate({batteryId}, updateData, {new: true});
    return updatedBattery;
  } catch (error) {
    throw new Error(`Failed to update battery: ${error.message}`);
  }
}

async function deleteBattery(batteryId) {
  try {
    await Battery.deleteOne({batteryId});
  } catch (error) {
    throw new Error(`Failed to delete battery: ${error.message}`);
  }
}

module.exports = {createBattery, findBatteryById, updateBattery, deleteBattery};
