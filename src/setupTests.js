const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');

const db = require('./db');

const dbAdapter = new Memory();
const dbInsance = low(dbAdapter);

db.setInstance(dbInsance);
db.configureData();
