const videos = require('../videos');

describe('videos service', () => {
  it('should exist', () => {
    expect(videos).toEqual(expect.any(Object));
  });

  it('should get list of all available videos', () => {
    const videosList = videos.getAll({});

    expect(videosList.length).toBeGreaterThanOrEqual(1);
  });
});
