const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

let mongoServer;

async function startMemoryServer() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  return uri;
}

async function connect() {
  const uri = await startMemoryServer();
  await mongoose.connect(uri);
}

async function disconnect() {
  await mongoose.disconnect();
  await mongoServer.stop();
}

module.exports = {connect, disconnect};
