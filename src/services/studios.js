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
    .filter(studio => studio.name.toLowerCase().includes(name.toLowerCase()))
    .orderBy(sort.key, sort.order)
    .value();
}

function findOneByName(name) {
  return db
    .getInstance()
    .get('studios')
    .find(studio => studio.name.toLowerCase().includes(name.toLowerCase()))
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
    _db = _db.filter(studio =>
      studio.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return _db.orderBy(sort.key, sort.order).value();
}

function findByIds(idList, { name, orderBy }) {
  let _db = db
    .getInstance()
    .get('studios')
    .reduce((memo, studio, index) => {
      const originalIndex = idList.indexOf(studio.id);

      if (originalIndex > -1) {
        memo[originalIndex] = studio;
      }

      return memo;
    }, []);

  if (name) {
    _db = _db.filter(studio =>
      studio.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (orderBy) {
    const sort = getSort(orderBy);

    _db = _db.orderBy(sort.key, sort.order);
  }

  return _db.value();
}

module.exports = {
  getAll,
  findByIds,
  findByName,
  findByCharacterId,
  findOneById,
  findOneByName
};
