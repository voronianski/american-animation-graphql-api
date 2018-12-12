const request = require('superagent');
const memoize = require('memoizee');
const config = require('c0nfig');

function getById(imdbId) {
  return new Promise((resolve, reject) => {
    console.log('MAKING REQ', imdbId);
    request
      .get(config.omdb.apiUrl)
      .query({
        apikey: config.omdb.apiKey,
        i: imdbId
      })
      .then(res => {
        resolve(res.body || {});
      })
      .catch(reject);
  });
}

const getByIdMemoized = memoize(getById, {
  promise: true,
  maxAge: config.omdb.memoizeTTL
});

module.exports = { getById, getByIdMemoized };
