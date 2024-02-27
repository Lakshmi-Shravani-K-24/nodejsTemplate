const { expect } = require('chai');
const {
  createBattery,
  findBatteryById,
  updateBattery,
  deleteBattery,
} = require('../index.js');

describe('CRUD operations for Battery', () => {
  const testErrorHandling = async (operation, args, expectedError) => {
    const result = await operation(...args);
    expect(result).to.have.property('error').that.equals(expectedError);
  };

  it('should return error for empty battery data during creation', async () => {
    await testErrorHandling(createBattery, [{}], 'Invalid battery data');
  });

  it('should return error for empty battery ID during find', async () => {
    await testErrorHandling(findBatteryById, [''], 'Invalid battery ID');
  });

  it('should return error for empty battery ID during update', async () => {
    await testErrorHandling(updateBattery, ['', {}], 'Invalid battery ID');
  });

  it('should return error for empty battery ID during deletion', async () => {
    await testErrorHandling(deleteBattery, [''], 'Invalid battery ID');
  });
});
