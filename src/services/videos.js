const db = require('../db');
const { getSort } = require('./utils');

function getAll({ orderBy }) {
  const sort = getSort(orderBy);

  return db
    .getInstance()
    .get('videos')
    .orderBy(sort.key, sort.order)
    .value();
}

function findOneById(id) {
  return db
    .getInstance()
    .get('videos')
    .getById(id)
    .value();
}

function findByName(name, { orderBy }) {
  const sort = getSort(orderBy);

  return db
    .getInstance()
    .get('videos')
    .filter(video => video.name.toLowerCase().includes(name.toLowerCase()))
    .orderBy(sort.key, sort.order)
    .value();
}

function findOneByName(name) {
  return db
    .getInstance()
    .get('videos')
    .find(video => video.name.toLowerCase().includes(name.toLowerCase()))
    .value();
}

function findByCharacterId(characterId, { name, orderBy }) {
  const sort = getSort(orderBy);

  let _db = db
    .getInstance()
    .get('videos')
    .filter(
      video => video.characters && video.characters.includes(characterId)
    );

  if (name) {
    _db = _db.filter(video =>
      video.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return _db.orderBy(sort.key, sort.order).value();
}

function findByStudioName(studioName, { name, orderBy }) {
  const sort = getSort(orderBy);

  let _db = db
    .getInstance()
    .get('videos')
    .filter(video =>
      video.studio.toLowerCase().includes(studioName.toLowerCase())
    );

  if (name) {
    _db = _db.filter(video =>
      video.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return _db.orderBy(sort.key, sort.order).value();
}

function findByIds(idList, { name, orderBy }) {
  let _db = db
    .getInstance()
    .get('videos')
    .reduce((memo, video, index) => {
      const originalIndex = idList.indexOf(video.id);

      if (originalIndex > -1) {
        memo[originalIndex] = video;
      }

      return memo;
    }, []);

  if (name) {
    _db = _db.filter(video =>
      video.name.toLowerCase().includes(name.toLowerCase())
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
  findByStudioName,
  findByCharacterId,
  findOneById,
  findOneByName
};
