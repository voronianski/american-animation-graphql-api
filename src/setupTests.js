const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');

const db = require('./db');

const dbAdapter = new Memory();
const dbInstance = low(dbAdapter);

db.setInstance(dbInstance);
db.configureData();
