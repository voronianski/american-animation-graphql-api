const videos = require('../videos');

describe('videos service', () => {
  it('should exist', () => {
    expect(videos).toEqual(expect.any(Object));
  });

  describe('getAll method', () => {
    it('should exist', () => {
      expect(videos.getAll).toEqual(expect.any(Function));
    });

    it('should get list of all available videos', () => {
      const videosList = videos.getAll({});

      expect(videosList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support ascending orderBy param', () => {
      const videosList = videos.getAll({
        orderBy: 'releasedIn_ASC'
      });

      expect(videosList[0].releasedIn).toBeLessThanOrEqual(
        videosList[1].releasedIn
      );
    });

    it('should support descending orderBy param', () => {
      const videosList = videos.getAll({
        orderBy: 'releasedIn_DESC'
      });

      expect(videosList[0].releasedIn).toBeGreaterThanOrEqual(
        videosList[1].releasedIn
      );
    });
  });

  describe('findByName method', () => {
    it('should exist', () => {
      expect(videos.findByName).toEqual(expect.any(Function));
    });

    it('should get list of videos that match provided name', () => {
      const videosList = videos.findByName('riding hood', {});

      expect(videosList.length).toBeGreaterThanOrEqual(2);
    });

    it('should support ascending orderBy param', () => {
      const videosList = videos.findByName('riding hood', {
        orderBy: 'releasedIn_ASC'
      });

      expect(videosList[0].releasedIn).toBeLessThanOrEqual(
        videosList[1].releasedIn
      );
    });

    it('should support descending orderBy param', () => {
      const videosList = videos.findByName('riding hood', {
        orderBy: 'releasedIn_DESC'
      });

      expect(videosList[0].releasedIn).toBeGreaterThanOrEqual(
        videosList[1].releasedIn
      );
    });
  });

  describe('findByStudioName method', () => {
    it('should exist', () => {
      expect(videos.findByStudioName).toEqual(expect.any(Function));
    });

    it('should get list of videos that match provided studio name', () => {
      const videosList = videos.findByStudioName('warner', {});

      expect(videosList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support filtering by name param', () => {
      const videosList = videos.findByStudioName('metro-goldwyn-mayer', {
        name: 'riding hood'
      });

      expect(videosList.length).toBeGreaterThanOrEqual(2);
    });

    it('should support ascending orderBy param', () => {
      const videosList = videos.findByStudioName('warner', {
        orderBy: 'releasedIn_ASC'
      });

      expect(videosList[0].releasedIn).toBeLessThanOrEqual(
        videosList[1].releasedIn
      );
    });

    it('should support descending orderBy param', () => {
      const videosList = videos.findByStudioName('warner', {
        orderBy: 'releasedIn_DESC'
      });

      expect(videosList[0].releasedIn).toBeGreaterThanOrEqual(
        videosList[1].releasedIn
      );
    });
  });

  describe('findByCharacterId method', () => {
    it('should exist', () => {
      expect(videos.findByCharacterId).toEqual(expect.any(Function));
    });

    it('should get list of videos that includes provided character id', () => {
      const videosList = videos.findByCharacterId('0KcKazo6WM', {});

      expect(videosList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support filtering by name param', () => {
      const videosList = videos.findByCharacterId('0KcKazo6WM', {
        name: 'seville'
      });

      expect(videosList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support ascending orderBy param', () => {
      const videosList = videos.findByCharacterId('0KcKazo6WM', {
        orderBy: 'releasedIn_ASC'
      });

      expect(videosList[0].releasedIn).toBeLessThanOrEqual(
        videosList[1].releasedIn
      );
    });

    it('should support descending orderBy param', () => {
      const videosList = videos.findByCharacterId('0KcKazo6WM', {
        orderBy: 'releasedIn_DESC'
      });

      expect(videosList[0].releasedIn).toBeGreaterThanOrEqual(
        videosList[1].releasedIn
      );
    });
  });

  describe('findOneById method', () => {
    it('should exist', () => {
      expect(videos.findOneById).toEqual(expect.any(Function));
    });

    it('should find one item with valid id', () => {
      const id = '9OxQsvoFyG';
      const videoItem = videos.findOneById(id);

      expect(videoItem).toBeDefined();
      expect(videoItem).toHaveProperty('id', id);
    });
  });

  describe('findOneByName method', () => {
    it('should exist', () => {
      expect(videos.findOneByName).toEqual(expect.any(Function));
    });

    it('should find one item with matching name', () => {
      const name = "What's Opera, Doc?";
      const videoItem = videos.findOneByName(name);

      expect(videoItem).toBeDefined();
      expect(videoItem).toHaveProperty('name', name);
    });
  });
});
