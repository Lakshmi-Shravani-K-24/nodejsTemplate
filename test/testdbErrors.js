/* eslint-disable no-empty */
/* eslint-disable max-len */
// const assert = require('assert');
const {expect} = require('chai');

const {createBattery, findBatteryById, updateBattery, deleteBattery} = require('../index.js');

describe('Error Handling in Battery Service', () => {
  it('should throw a ValidationError for empty batteryData', async () => {
    const batteryData = {}; // Empty data to intentionally cause an error

    try {
      await createBattery(batteryData);
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.name).to.equal('Error');
      expect(error.message).to.equal('Battery data is required');
    }
  });

  it('should throw an error when batteryId is not provided', async () => {
    const batteryId = ''; // Empty ID to intentionally cause an error
    try {
      await findBatteryById(batteryId);
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('Battery ID is required');
    }
  });

  it('should throw error for updateBattery when batteryId is invalid', async () => {
    const batteryId = '';
    const updateData = {temperature: 30}; // Arbitrary update data
    try {
      await updateBattery(batteryId, updateData);
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('Battery ID is required');
    }
  });

  it('should throw error for deleteBattery when batteryId is invalid', async () => {
    const batteryId = ''; // Empty ID to intentionally cause an error
    try {
      await deleteBattery(batteryId);
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('Battery ID is required');
    }
  });
});
