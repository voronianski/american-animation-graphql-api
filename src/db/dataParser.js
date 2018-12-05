const path = require('path');
const YAML = require('yamljs');
const klawSync = require('klaw-sync');
const shortid = require('shortid');

function findDataFiles(dirPath) {
  return klawSync(dirPath, {
    nodir: true,
    traverseAll: true,
    filter: f => path.extname(f.path) === '.yml'
  }).map(f => f.path);
}

function parseDataFiles(fpaths = []) {
  return fpaths.reduce((memo, fpath) => {
    let fileData;

    try {
      fileData = YAML.load(fpath);
    } catch (err) {
      console.log(`Failed to parse YAML from ${fpath}`, err);
    }

    if (fileData) {
      const fileName = path.basename(fpath, '.yml');
      memo[fileName] = fileData;
    }

    return memo;
  }, {});
}

function transformData(data = {}) {
  // populate all items with ids
  const addId = (obj = {}) => (obj.id = shortid.generate());

  Object.keys(data).forEach(collectionName => {
    const collectionData = data[collectionName];

    if (Array.isArray(collectionData)) {
      collectionData.forEach(addId);
    } else {
      addId(collectionData);
    }
  });

  // create links between collections
  Object.keys(data).forEach(collectionName => {
    const collection = data[collectionName];

    collection.forEach(collectionItem => {
      Object.keys(collectionItem).forEach(collectionItemField => {
        const relatedCollection = data[collectionItemField];

        if (relatedCollection && relatedCollection.length) {
          const linkedNames = collectionItem[collectionItemField];

          linkedNames.forEach((linkedName, index) => {
            const targetItem = relatedCollection.find(item => {
              return item.name === linkedName;
            });

            if (targetItem) {
              linkedNames.splice(index, 1, targetItem.id);
            }
          });
        }
      });
    });
  });

  return data;
}

function read() {
  const dataDir = path.resolve(__dirname, '../../data');
  const dataFiles = findDataFiles(dataDir);
  const parsedData = parseDataFiles(dataFiles);
  const readyData = transformData(parsedData);

  return readyData;
}

module.exports = { read };
