const db = require('../db');

function getAll() {
  return db
    .getInstance()
    .get('characters')
    .value();
}

function findOneById(id) {
  return db
    .getInstance()
    .get('characters')
    .getById(id)
    .value();
}

function findByName(name) {
  return db
    .getInstance()
    .get('characters')
    .filter(character => character.name.toLowerCase().includes(name))
    .value();
}

function findOneByName(name) {
  return db
    .getInstance()
    .get('characters')
    .find(character => character.name.toLowerCase().includes(name))
    .value();
}

function findByStudioId(studioId) {
  return db
    .getInstance()
    .get('characters')
    .filter(character => character.studios.includes(studioId))
    .value();
}

module.exports = {
  getAll,
  findByName,
  findByStudioId,
  findOneById,
  findOneByName
};
