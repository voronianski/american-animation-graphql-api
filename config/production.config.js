module.exports = {
  port: process.env.NODE_PORT || process.env.PORT || 80,
  omdb: {
    apiUrl: 'https://www.omdbapi.com',
    apiKey: process.env.OMDB_API_KEY,
    memoizeTTL: 1000 * 60 * 60 * 24 // 1 day
  }
};
