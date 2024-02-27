/* eslint-disable max-len */
const mongoose = require('mongoose');
const assert = require('assert');
const {expect} = require('chai');
const {
  createBattery,
  findBatteryById,
  updateBattery,
  deleteBattery,
} = require('../index.js');
const {connect, disconnect} = require('../dbconnection.js');

describe('CRUD operations for Battery', () => {
  before(async () => {
    await connect(); // Connect to the in-memory database before running tests
  });

  after(async () => {
    await disconnect(); // Disconnect from the in-memory database after running tests
  });

  it('should connect to the in-memory database', async function() {
    this.timeout(5000); // Set timeout to 5000ms (5 seconds)
    assert.strictEqual(mongoose.connection.readyState, 1); // 1 means connected
  });
  const testErrorHandling = async (operation, args, expectedError) => {
    const result = await operation(...args);
    expect(result).to.have.property('error').that.equals(expectedError);
  };
  it('should return error for empty battery data during creation', async () => {
    await testErrorHandling(createBattery, [{}], 'Invalid battery data');
    // Additional test cases
    await testErrorHandling(createBattery, [null], 'Invalid battery data');
    await testErrorHandling(createBattery, [undefined], 'Invalid battery data');
    await testErrorHandling(createBattery, [123], 'Invalid battery data');
  });
  it('should return error for invalid battery ID during find', async () => {
    await testErrorHandling(findBatteryById, [''], 'Invalid battery ID');
    // Additional test cases
    await testErrorHandling(findBatteryById, [null], 'Invalid battery ID');
    await testErrorHandling(findBatteryById, [undefined], 'Invalid battery ID');
    await testErrorHandling(findBatteryById, [123], 'Invalid battery ID');
  });

  it('should return error for invalid battery ID during update', async () => {
    await testErrorHandling(updateBattery, ['', {}], 'Invalid battery ID');
    // Additional test cases
    await testErrorHandling(updateBattery, [null, {}], 'Invalid battery ID');
    await testErrorHandling(updateBattery, [undefined, {}], 'Invalid battery ID');
    await testErrorHandling(updateBattery, [123, {}], 'Invalid battery ID');
    await testErrorHandling(updateBattery, ['nonexistentId', {}], 'Battery not found');
  });

  it('should return error for invalid battery ID during deletion', async () => {
    await testErrorHandling(deleteBattery, [''], 'Invalid battery ID');
    // Additional test cases
    await testErrorHandling(deleteBattery, [null], 'Invalid battery ID');
    await testErrorHandling(deleteBattery, [undefined], 'Invalid battery ID');
    await testErrorHandling(deleteBattery, [123], 'Invalid battery ID');
    await testErrorHandling(deleteBattery, ['nonexistentId'], 'Battery not found');
  });
});
