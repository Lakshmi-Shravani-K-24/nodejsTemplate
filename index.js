/* eslint-disable complexity */
const Battery = require('./BatterySchema'); // Assuming your model file is in the same directory

// CREATE operation
async function createBattery(batteryData) {
  validateBatteryData(batteryData);
  return Battery.create(batteryData);
}

// READ operation
function getBatteryById(batteryId) {
  validateBatteryId(batteryId);
  return Battery.findById(batteryId);
}

// UPDATE operation
async function updateBattery(batteryId, objectId, newData) {
  validateBatteryId(batteryId);
  if (newData === null || newData === undefined) {
    throw new Error('New data is required for updating the battery.');
  }
  return Battery.findByIdAndUpdate(objectId, newData, {new: true});
}

// DELETE operation
async function deleteBattery(batteryId) {
  validateBatteryId(batteryId);
  return Battery.findByIdAndDelete(batteryId);
}

// Function to validate battery data
function validateBatteryData(data) {
  const {batteryname, temperature, soc, chargerate} = data;
  const errors = [];

  function checkRequired(field, errorMessage) {
    if (!field) {
      errors.push(errorMessage);
    }
  }

  function checkNumber(field, fieldName) {
    if (typeof field !== 'number' || isNaN(field)) {
      errors.push(`${fieldName} must be a number.`);
    }
  }

  checkRequired(batteryname, 'Battery name is required.');
  checkNumber(temperature, 'Temperature');
  checkNumber(soc, 'State of charge (SOC)');
  checkNumber(chargerate, 'Charging rate');

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }
}

function validateBatteryId(batteryId) {
  if (!batteryId) {
    throw new Error('Battery ID is required.');
  }
}


module.exports = {
  createBattery,
  getBatteryById,
  updateBattery,
  deleteBattery,
};
