const mongoose = require('mongoose');
const assert = require('assert');
const {connect, disconnect} = require('../dbconnection.js');
const {
  createBattery,
  findBatteryById,
  updateBattery,
  deleteBattery,
} = require('../index.js');
const Battery = require('../BatterySchema');

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

  describe('Battery Schema Validation', () => {
    it('should require batteryId', async () => {
      const battery = new Battery({
        batteryname: 'Test Battery',
        temperature: 25,
        soc: 50,
        chargerate: 10,
      });

      let err;
      try {
        await battery.validate();
      } catch (error) {
        err = error;
      }
      assert.strictEqual(err.errors.batteryId.message, 'Path `batteryId` is required.');
    });

    it('should require batteryname', async () => {
      const battery = new Battery({
        batteryId: 'test123',
        temperature: 25,
        soc: 50,
        chargerate: 10,
      });

      let err;
      try {
        await battery.validate();
      } catch (error) {
        err = error;
      }
      assert.strictEqual(err.errors.batteryname.message, 'Path `batteryname` is required.');
    });

    it('should require temperature', async () => {
      const battery = new Battery({
        batteryId: 'test123',
        batteryname: 'Test Battery',
        soc: 50,
        chargerate: 10,
      });

      let err;
      try {
        await battery.validate();
      } catch (error) {
        err = error;
      }
      assert.strictEqual(err.errors.temperature.message, 'Path `temperature` is required.');
    });

    it('should require soc', async () => {
      const battery = new Battery({
        batteryId: 'test123',
        batteryname: 'Test Battery',
        temperature: 25,
        chargerate: 10,
      });

      let err;
      try {
        await battery.validate();
      } catch (error) {
        err = error;
      }
      assert.strictEqual(err.errors.soc.message, 'Path `soc` is required.');
    });

    it('should require chargerate', async () => {
      const battery = new Battery({
        batteryId: 'test123',
        batteryname: 'Test Battery',
        temperature: 25,
        soc: 50,
      });

      let err;
      try {
        await battery.validate();
      } catch (error) {
        err = error;
      }
      assert.strictEqual(err.errors.chargerate.message, 'Path `chargerate` is required.');
    });

    it('should create a valid battery with all required fields', async () => {
      const battery = new Battery({
        batteryId: 'test123',
        batteryname: 'Test Battery',
        temperature: 25,
        soc: 50,
        chargerate: 10,
      });

      const result = await battery.validate();
      assert.strictEqual(result, undefined);
    });
  });
});
