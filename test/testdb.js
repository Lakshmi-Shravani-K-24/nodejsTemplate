const chai = require('chai');
const {createBattery, getBatteryById, updateBattery, deleteBattery} = require('../index');
const {connect, disconnect} = require('../dbconnection');
const {expect} = chai;

describe('Battery CRUD Operations', () => {
  let testBatteryId;
  before(async function() {
    this.timeout(5000); // Set timeout to 5000ms (or adjust as needed)
    await connect(); // Connect to the in-memory database before running tests
  });
  after(async () => {
    await disconnect(); // Disconnect from the in-memory database after running tests
  });

  beforeEach(async () => {
    // Create a new battery before each test
    const batteryData = {
      batteryId: '123456',
      batteryname: 'Test Battery',
      temperature: 25,
      soc: 80,
      chargerate: 5,
    };
    const createdBattery = await createBattery(batteryData);
    testBatteryId = createdBattery._id; // Store the ID for later use
  });

  afterEach(async () => {
    // Delete the test battery after each test
    await deleteBattery(testBatteryId);
  });

  it('should create a battery', async () => {
    // Test the creation of a battery
    expect(testBatteryId).to.exist;
  });

  it('should get a battery by ID', async () => {
    // Test getting a battery by ID
    const battery = await getBatteryById(testBatteryId);
    expect(battery).to.exist;
    expect(battery.batteryId).to.equal('123456');
  });

  it('should update a battery', async () => {
    // Test updating a battery
    const newData = {
      soc: 85,
    };
    const updatedBattery = await updateBattery( '123456', testBatteryId, newData);
    expect(updatedBattery).to.exist;
    expect(updatedBattery.soc).to.equal(85);
  });

  it('should delete a battery', async () => {
    // Test deleting a battery
    const deletedBattery = await deleteBattery(testBatteryId);
    expect(deletedBattery).to.exist;
    expect(deletedBattery._id.toString()).to.equal(testBatteryId.toString());
  });
});
