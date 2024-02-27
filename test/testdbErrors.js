/* eslint-disable max-len */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {createBattery, updateBattery, deleteBattery} = require('../index');
const {expect} = chai;
const {connect, disconnect} = require('../dbconnection');
chai.use(chaiAsPromised);

describe('Battery CRUD Operations - Negative Cases', function() {
  before(async function() {
    await connect(); // Connect to the in-memory database before running tests
  });

  after(async function() {
    await disconnect(); // Disconnect from the in-memory database after running tests
  });

  describe('Create Battery', function() {
    it('should throw error when battery data is empty', async function() {
      await expect(createBattery({})).to.be.rejectedWith(Error);
    });

    it('should throw error when required fields are missing', async function() {
      const batteryData = {
        // Missing required fields
      };
      await expect(createBattery(batteryData)).to.be.rejectedWith(Error);
    });

    it('should throw error when temperature is not a number', async function() {
      const batteryData = {
        batteryId: '123456',
        batteryname: 'Test Battery',
        temperature: 'not a number', // Invalid temperature
        soc: 80,
        chargerate: 5,
      };
      await expect(createBattery(batteryData)).to.be.rejectedWith(Error);
    });

    // Additional negative cases can be added for createBattery function
  });
  describe('Update Battery', function() {
    it('should throw error when battery ID is empty', async function() {
      const newData = {
        soc: 85,
      };
      await expect(updateBattery('', '123456', newData)).to.be.rejectedWith(Error);
    });
    it('should throw error when new data is null', async function() {
      const batteryId = 'someBatteryId';
      const objectId = 'someObjectId';
      const newData = null;
      await expect(updateBattery(batteryId, objectId, newData)).to.be.rejectedWith(Error, 'New data is required for updating the battery.');
    });
  });

  describe('Delete Battery', function() {
    it('should throw error when battery ID is empty', async function() {
      await expect(deleteBattery('')).to.be.rejectedWith(Error);
    });

    // Additional negative cases can be added for deleteBattery function
  });
});
