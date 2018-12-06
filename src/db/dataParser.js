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
  Object.keys(data).forEach(colName => {
    const collection = data[colName];

    collection.forEach(colItem => {
      Object.keys(colItem).forEach(colItemKey => {
        const relatedCol = data[colItemKey];

        if (relatedCol && relatedCol.length) {
          const colItemKeyNames = colItem[colItemKey];

          colItemKeyNames.forEach((name, index) => {
            const relatedColItem = relatedCol.find(item => {
              return item.name === name;
            });

            if (relatedColItem) {
              colItemKeyNames.splice(index, 1, relatedColItem.id);

              const relatedColItemKeyNames = relatedColItem[colName] || [];
              const isAlreadyAdded = relatedColItemKeyNames.find(nameOrId => {
                return nameOrId === colItem.id || nameOrId === colItem.name;
              });

              if (!isAlreadyAdded) {
                relatedColItemKeyNames.push(colItem.id);
              }

              relatedColItem[colName] = relatedColItemKeyNames;
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
