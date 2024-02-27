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

  it('should ensure description field is a string', async () => {
    const battery = new Battery({
      batteryId: 'test123',
      batteryname: 'Test Battery li-Ion',
      temperature: 34,
      soc: 60,
      chargerate: 0.8,
      description: {}, // Providing an empty object instead of a string
    });

    let err;
    try {
      await battery.validate();
    } catch (error) {
      err = error;
    }
    assert.strictEqual(err.errors.description.message, 'Description must be a string.');
  });
});
