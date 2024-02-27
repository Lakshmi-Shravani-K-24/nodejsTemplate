const {expect} = require('chai');
const {
  createBattery,
  findBatteryById,
  updateBattery,
  deleteBattery,
} = require('../index.js');

describe('CRUD operations for Battery', () => {
  it('should return error for empty battery data during creation', async () => {
    const result = await createBattery({});
    expect(result).to.have.property('error').that.equals('Invalid battery data');
  });

  it('should return error for empty battery ID during find', async () => {
    const result = await findBatteryById('');
    expect(result).to.have.property('error').that.equals('Invalid battery ID');
  });

  it('should return error for empty battery ID during update', async () => {
    const result = await updateBattery('', {});
    expect(result).to.have.property('error').that.equals('Invalid battery ID');
  });

  it('should return error for empty battery ID during deletion', async () => {
    const result = await deleteBattery('');
    expect(result).to.have.property('error').that.equals('Invalid battery ID');
  });
});
