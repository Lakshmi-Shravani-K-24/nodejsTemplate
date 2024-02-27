const assert = require('assert');
const Battery = require('../BatterySchema');

describe('Battery Schema Validation', () => {
  const testCases = [
    {
      field: 'batteryId',
      testData: {
        batteryname: 'Test Battery',
        temperature: 25,
        soc: 50,
        chargerate: 10,
      },
      errorMessage: 'Path `batteryId` is required.'
    },
    {
      field: 'batteryname',
      testData: {
        batteryId: 'test123',
        temperature: 25,
        soc: 50,
        chargerate: 10,
      },
      errorMessage: 'Path `batteryname` is required.'
    },
    {
      field: 'temperature',
      testData: {
        batteryId: 'test123',
        batteryname: 'Test Battery',
        soc: 50,
        chargerate: 10,
      },
      errorMessage: 'Path `temperature` is required.'
    },
    {
      field: 'soc',
      testData: {
        batteryId: 'test123',
        batteryname: 'Test Battery',
        temperature: 25,
        chargerate: 10,
      },
      errorMessage: 'Path `soc` is required.'
    },
    {
      field: 'chargerate',
      testData: {
        batteryId: 'test123',
        batteryname: 'Test Battery',
        temperature: 25,
        soc: 50,
      },
      errorMessage: 'Path `chargerate` is required.'
    }
  ];

  testCases.forEach(({ field, testData, errorMessage }) => {
    it(`should require ${field}`, async () => {
      const battery = new Battery(testData);
      let err;
      try {
        await battery.validate();
      } catch (error) {
        err = error;
      }
      assert.strictEqual(err.errors[field].message, errorMessage);
    });
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

  it('should ensure batteryId is unique', async () => {
    before(async () => {
    await connect(); // Connect to the in-memory database before running CRUD tests
  });
    const batteryData1 = {
      batteryId: 'test123',
      batteryname: 'Test Battery 1',
      temperature: 25,
      soc: 50,
      chargerate: 10,
    };

    const batteryData2 = {
      batteryId: 'test123',
      batteryname: 'Test Battery 2',
      temperature: 30,
      soc: 60,
      chargerate: 12,
    };

    const battery1 = new Battery(batteryData1);
    await battery1.save();

    let err;
    const battery2 = new Battery(batteryData2);
    try {
      await battery2.save();
    } catch (error) {
      err = error;
    }

    assert.strictEqual(err.name, 'MongoError');
    assert.strictEqual(err.code, 11000); // MongoDB duplicate key error code
  });
});
