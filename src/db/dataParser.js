const path = require('path');
const YAML = require('yamljs');
const klawSync = require('klaw-sync');

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
  // TO DO:
  // add shortids and maybe name slugs

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
