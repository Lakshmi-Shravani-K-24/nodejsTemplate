const mongoose = require('mongoose');
const assert = require('assert');
const {connect, disconnect} = require('../dbconnection.js');
const {createBattery, findBatteryById, updateBattery, deleteBattery} = require('../index.js');

describe('Database Connection', () => {
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
});

describe('Battery CRUD operations', () => {
  before(async () => {
    await connect(); // Connect to the in-memory database before running CRUD tests
  });

  after(async () => {
    await disconnect(); // Disconnect from the in-memory database after running CRUD tests
  });

  beforeEach(async () => {
    // No need to connect here as it's already connected in 'before' hook
    // Insert test data before each test case
    const batteryData = {
      batteryId: '12345',
      batteryname: 'Test Battery',
      temperature: 25,
      soc: 80,
      chargerate: 5,
      description: 'Test battery description',
    };
    await createBattery(batteryData);
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await deleteBattery('12345');
  });

  it('should create a new battery', async () => {
    const batteryData = {
      batteryId: '67890',
      batteryname: 'Test Battery 2',
      temperature: 30,
      soc: 70,
      chargerate: 7,
      description: 'Test battery 2 description',
    };
    const newBattery = await createBattery(batteryData);
    assert.strictEqual(newBattery.batteryId, batteryData.batteryId);
  });

  it('should read the created battery', async () => {
    const battery = await findBatteryById('12345');
    assert.ok(battery); // Check if battery exists
    assert.strictEqual(battery.batteryname, 'Test Battery');
  });

  it('should update the battery', async () => {
    await updateBattery('12345', {temperature: 30});
    const updatedBattery = await findBatteryById('12345');
    assert.strictEqual(updatedBattery.temperature, 30);
  });

  it('should delete the battery', async () => {
    await deleteBattery('12345');
    const deletedBattery = await findBatteryById('12345');
    assert.strictEqual(deletedBattery, null);
  });
});
