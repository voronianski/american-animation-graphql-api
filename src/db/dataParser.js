const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const klawSync = require('klaw-sync');
const shortid = require('shortid');

const dataExt = '.yml';
const dataDir = path.resolve(__dirname, '../../data');

function findDataFiles(dirPath) {
  return klawSync(dirPath, {
    nodir: true,
    traverseAll: true,
    filter: f => path.extname(f.path) === dataExt
  }).map(f => f.path);
}

function parseDataFiles(fpaths = []) {
  return fpaths.reduce((memo, fpath) => {
    let fileData;

    try {
      const file = fs.readFileSync(fpath, 'utf8');

      fileData = YAML.parse(file);
    } catch (err) {
      console.log(`Failed to parse YAML from ${fpath}`, err);
    }

    if (fileData) {
      const fileName = path.basename(fpath, dataExt);
      memo[fileName] = fileData;
    }

    return memo;
  }, {});
}

function updateDataFiles(fpaths, data = {}) {
  fpaths.forEach(fpath => {
    const fileName = path.basename(fpath, dataExt);
    const yamlStr = YAML.stringify(data[fileName]);

    fs.writeFileSync(fpath, yamlStr, 'utf8');
  });
}

function populateDataIds(data = {}) {
  const addId = (obj = {}) => {
    if (!obj.id) {
      obj.id = shortid.generate();
    }
  };

  Object.keys(data).forEach(collectionName => {
    const collectionData = data[collectionName];

    if (Array.isArray(collectionData)) {
      collectionData.forEach(addId);
    } else {
      addId(collectionData);
    }
  });

  return data;
}

function linkCollections(data = {}) {
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
  const dataFiles = findDataFiles(dataDir);
  const parsedData = parseDataFiles(dataFiles);
  const dataWithIds = populateDataIds(parsedData);
  const readyData = linkCollections(dataWithIds);

  return readyData;
}

function prepare() {
  const dataFiles = findDataFiles(dataDir);
  const parsedData = parseDataFiles(dataFiles);
  const dataWithIds = populateDataIds(parsedData);

  updateDataFiles(dataFiles, dataWithIds);

  return dataWithIds;
}

module.exports = { read, prepare };
