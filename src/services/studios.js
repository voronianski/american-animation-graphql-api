const db = require('../db');

function getAll() {
  return db
    .getInstance()
    .get('studios')
    .value();
}

function findOneById(id) {
  return db
    .getInstance()
    .get('studios')
    .getById(id)
    .value();
}

function findByName(name) {
  return db
    .getInstance()
    .get('studios')
    .filter(studio => studio.name.toLowerCase().includes(name))
    .value();
}

function findOneByName(name) {
  return db
    .getInstance()
    .get('studios')
    .find(studio => studio.name.toLowerCase().includes(name))
    .value();
}

function findByCharacterId(characterId) {
  return db
    .getInstance()
    .get('studios')
    .filter(
      studio => studio.characters && studio.characters.includes(characterId)
    )
    .value();
}

module.exports = {
  getAll,
  findByName,
  findByCharacterId,
  findOneById,
  findOneByName
};
