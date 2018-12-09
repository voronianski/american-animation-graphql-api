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

function setInstance(db) {
  dbInstance = db;
}

function cleanDataFile() {
  fs.removeSync(path.resolve(__dirname, '../../.db.json'));
}

function configureData(mockedData) {
  const data = mockedData || dataParser.read();

  dbInstance._.mixin(lodashId);
  dbInstance.defaults(data).write();
}

function init() {
  cleanDataFile();

  const dbAdapter = new FileAsync('.db.json');

  return low(dbAdapter).then(db => {
    setInstance(db);
    configureData();
  });
}

module.exports = {
  getInstance,
  setInstance,
  configureData,
  cleanDataFile,
  init
};
