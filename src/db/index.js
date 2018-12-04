const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const shortid = require('shortid');
const lodashId = require('lodash-id');

const dataParser = require('./dataParser');

lodashId.createId = () => shortid.generate();

let dbInstance;

function init() {
  const data = dataParser.read();
  const adapter = new FileAsync('.db.json');

  return low(adapter).then(db => {
    dbInstance = db;

    db._.mixin(lodashId);
    db.defaults(data).write();

    // db.get('studios').upsert({title: 'Test!'}).write();
  });
}

function getInstance() {
  return dbInstance;
}

module.exports = { init, getInstance };
