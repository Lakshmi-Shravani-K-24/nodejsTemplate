const Battery = require('./models/BatteryModel');

const createBattery = async (batteryData) => {
  try {
    const battery = new Battery(batteryData);
    const result = await battery.save();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getBattery = async (query) => {
  try {
    const result = await Battery.find(query);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateBattery = async (filter, update) => {
  try {
    const result = await Battery.updateOne(filter, update);
    console.log(result);
    return result;
  } catch (error) {
    console.log('Error in updating data');
    throw error;
  }
};

const deleteBattery = async (id) => {
  try {
    const deletedBattery = await Battery.findByIdAndDelete(id);
    if (!deletedBattery) {
      console.log('Battery not found');
      return null;
    } else {
      console.log('Battery deleted successfully');
      return deletedBattery;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {createBattery, getBattery, updateBattery, deleteBattery};
