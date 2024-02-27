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

  it('should fail validation when model name is set to an empty string', async () => {
    try {
      // Attempt to create a battery model with an empty string as the model name
      const Battery = mongoose.model('', BatterySchema); // This line corresponds to the mutant
      const battery = new Battery({
        batteryId: 'test123',
        batteryname: 'Test Battery',
        temperature: 25,
        soc: 50,
        chargerate: 10,
      });
      await battery.validate(); // This line should throw an error
      assert.fail('Validation should fail');
    } catch (error) {
      assert.ok(error); // Validation should fail due to empty model name
    }
  });
});
