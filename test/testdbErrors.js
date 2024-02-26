/* eslint-disable max-len */
const assert = require('assert');
const {createBattery, findBatteryById, updateBattery, deleteBattery} = require('../index.js');

describe('Error Handling in Battery Service', () => {
  it('should throw error for createBattery', async () => {
    const batteryData = {}; // Empty data to intentionally cause an error

    try {
      await createBattery(batteryData);
    } catch (error) {
      assert.strictEqual(error.message, 'Failed to create battery: Battery validation failed: chargerate: Path `chargerate` is required., soc: Path `soc` is required., temperature: Path `temperature` is required., batteryname: Path `batteryname` is required., batteryId: Path `batteryId` is required.' );
    }
  });

  it('should throw error for findBatteryById', async () => {
    const batteryId = 'invalidId'; // Invalid ID to intentionally cause an error

    try {
      await findBatteryById(batteryId);
    } catch (error) {
      assert.strictEqual(error.message, 'Failed to find battery: Client must be connected before running operations');
    }
  });

  it('should throw error for updateBattery', async () => {
    const batteryId = 'invalidId'; // Invalid ID to intentionally cause an error
    const updateData = {temperature: 30}; // Arbitrary update data

    try {
      await updateBattery(batteryId, updateData);
    } catch (error) {
      assert.strictEqual(error.message, 'Failed to update battery: Client must be connected before running operations');
    }
  });

  it('should throw error for deleteBattery', async () => {
    const batteryId = 'invalidId'; // Invalid ID to intentionally cause an error

    try {
      await deleteBattery(batteryId);
    } catch (error) {
      assert.strictEqual(error.message, 'Failed to delete battery: Client must be connected before running operations');
    }
  });
});
