const db = require('../db');
const { getSort } = require('./utils');

function getAll({ orderBy }) {
  const sort = getSort(orderBy);

  return db
    .getInstance()
    .get('studios')
    .orderBy(sort.key, sort.order)
    .value();
}

function findOneById(id) {
  return db
    .getInstance()
    .get('studios')
    .getById(id)
    .value();
}

function findByName(name, { orderBy }) {
  const sort = getSort(orderBy);

  return db
    .getInstance()
    .get('studios')
    .filter(studio => studio.name.toLowerCase().includes(name))
    .orderBy(sort.key, sort.order)
    .value();
}

function findOneByName(name) {
  return db
    .getInstance()
    .get('studios')
    .find(studio => studio.name.toLowerCase().includes(name))
    .value();
}

function findByCharacterId(characterId, { name, orderBy }) {
  const sort = getSort(orderBy);

  let _db = db
    .getInstance()
    .get('studios')
    .filter(
      studio => studio.characters && studio.characters.includes(characterId)
    );

  if (name) {
    _db = _db.filter(studio => studio.name.toLowerCase().includes(name));
  }

  return _db.orderBy(sort.key, sort.order).value();
}

module.exports = {
  getAll,
  findByName,
  findByCharacterId,
  findOneById,
  findOneByName
};
