const db = require('../db');
const { getSort } = require('./utils');

function getAll({ orderBy }) {
  const sort = getSort(orderBy);

  return db
    .getInstance()
    .get('characters')
    .orderBy(sort.key, sort.order)
    .value();
}

function findOneById(id) {
  return db
    .getInstance()
    .get('characters')
    .getById(id)
    .value();
}

function findByName(name, { orderBy }) {
  const sort = getSort(orderBy);

  return db
    .getInstance()
    .get('characters')
    .filter(character =>
      character.name.toLowerCase().includes(name.toLowerCase())
    )
    .orderBy(sort.key, sort.order)
    .value();
}

function findOneByName(name) {
  return db
    .getInstance()
    .get('characters')
    .find(character =>
      character.name.toLowerCase().includes(name.toLowerCase())
    )
    .value();
}

function findByStudioId(studioId, { name, orderBy }) {
  const sort = getSort(orderBy);

  let _db = db
    .getInstance()
    .get('characters')
    .filter(
      character => character.studios && character.studios.includes(studioId)
    );

  if (name) {
    _db = _db.filter(character =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return _db.orderBy(sort.key, sort.order).value();
}

function findByVideoId(videoId, { name, orderBy }) {
  const sort = getSort(orderBy);

  let _db = db
    .getInstance()
    .get('characters')
    .filter(
      character => character.videos && character.videos.includes(videoId)
    );

  if (name) {
    _db = _db.filter(character =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return _db.orderBy(sort.key, sort.order).value();
}

function findByIds(idList, { name, orderBy }) {
  let _db = db
    .getInstance()
    .get('characters')
    .filter(character => idList.includes(character.id));

  if (name) {
    _db = _db.filter(character =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (orderBy) {
    const sort = getSort(orderBy);

    _db = _db.orderBy(sort.key, sort.order);
  } else {
    _db = _db.reduce((memo, character, index) => {
      const originalIndex = idList.indexOf(character.id);

      memo.splice(originalIndex, 0, character);

      return memo;
    }, []);
  }

  return _db.value();
}

module.exports = {
  getAll,
  findByIds,
  findByName,
  findByStudioId,
  findByVideoId,
  findOneById,
  findOneByName
};
