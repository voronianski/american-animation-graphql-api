const path = require('path');
const fs = require('fs-extra');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const shortid = require('shortid');
const lodashId = require('lodash-id');

const dataParser = require('./dataParser');

lodashId.createId = () => shortid.generate();

let dbInstance;

function getInstance() {
  return dbInstance;
}

function cleanDb() {
  fs.removeSync(path.resolve(__dirname, '../../.db.json'));
}

function init() {
  cleanDb();

  const data = dataParser.read();
  const adapter = new FileAsync('.db.json');

  return low(adapter).then(db => {
    dbInstance = db;

    db._.mixin(lodashId);
    db.defaults(data).write();
  });
}

module.exports = { getInstance, cleanDb, init };
