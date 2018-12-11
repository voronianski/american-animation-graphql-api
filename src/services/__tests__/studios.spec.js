const studios = require('../studios');

describe('studios service', () => {
  it('should exist', () => {
    expect(studios).toEqual(expect.any(Object));
  });

  describe('getAll method', () => {
    it('should exist', () => {
      expect(studios.getAll).toEqual(expect.any(Function));
    });

    it('should get list of all available studios', () => {
      const studiosList = studios.getAll({});

      expect(studiosList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support ascending orderBy param', () => {
      const studiosList = studios.getAll({
        orderBy: 'foundedIn_ASC'
      });

      expect(studiosList[0].foundedIn).toBeLessThanOrEqual(
        studiosList[1].foundedIn
      );
    });

    it('should support descending orderBy param', () => {
      const studiosList = studios.getAll({
        orderBy: 'foundedIn_DESC'
      });

      expect(studiosList[0].foundedIn).toBeGreaterThanOrEqual(
        studiosList[1].foundedIn
      );
    });
  });

  describe('findByName method', () => {
    it('should exist', () => {
      expect(studios.findByName).toEqual(expect.any(Function));
    });

    it('should get list of studios that match provided name', () => {
      const studiosList = studios.findByName('walt', {});

      expect(studiosList.length).toBeGreaterThanOrEqual(2);
    });

    it('should support ascending orderBy param', () => {
      const studiosList = studios.findByName('walt', {
        orderBy: 'foundedIn_ASC'
      });

      expect(studiosList[0].foundedIn).toBeLessThanOrEqual(
        studiosList[1].foundedIn
      );
    });

    it('should support descending orderBy param', () => {
      const studiosList = studios.findByName('walt', {
        orderBy: 'foundedIn_DESC'
      });

      expect(studiosList[0].foundedIn).toBeGreaterThanOrEqual(
        studiosList[1].foundedIn
      );
    });
  });

  describe('findByCharacterId method', () => {
    it('should exist', () => {
      expect(studios.findByCharacterId).toEqual(expect.any(Function));
    });

    it('should get list of studios that includes provided character id', () => {
      const studiosList = studios.findByCharacterId('IRmTQc2lXD', {});

      expect(studiosList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support filtering by name param', () => {
      const studiosList = studios.findByCharacterId('IRmTQc2lXD', {
        name: 'famous'
      });

      expect(studiosList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support ascending orderBy param', () => {
      const studiosList = studios.findByCharacterId('IRmTQc2lXD', {
        orderBy: 'foundedIn_ASC'
      });

      expect(studiosList[0].foundedIn).toBeLessThanOrEqual(
        studiosList[1].foundedIn
      );
    });

    it('should support descending orderBy param', () => {
      const studiosList = studios.findByCharacterId('IRmTQc2lXD', {
        orderBy: 'foundedIn_DESC'
      });

      expect(studiosList[0].foundedIn).toBeGreaterThanOrEqual(
        studiosList[1].foundedIn
      );
    });
  });

  describe('findOneById method', () => {
    it('should exist', () => {
      expect(studios.findOneById).toEqual(expect.any(Function));
    });

    it('should find one item with valid id', () => {
      const id = 'Rc5hZk9hhN';
      const studioItem = studios.findOneById(id);

      expect(studioItem).toBeDefined();
      expect(studioItem).toHaveProperty('id', id);
    });
  });

  describe('findOneByName method', () => {
    it('should exist', () => {
      expect(studios.findOneByName).toEqual(expect.any(Function));
    });

    it('should find one item with matching name', () => {
      const name = 'Walt Disney Productions';
      const studioItem = studios.findOneByName(name);

      expect(studioItem).toBeDefined();
      expect(studioItem).toHaveProperty('name', name);
    });
  });

  describe('findByIds method', () => {
    it('should exist', () => {
      expect(studios.findByIds).toEqual(expect.any(Function));
    });

    it('should find only studios with selected ids and keep order by default', () => {
      const ids = ['Rc5hZk9hhN', 'ur6BO5ei2p7'];
      const studiosList = studios.findByIds(ids, {});

      expect(studiosList.length).toEqual(2);
      expect(studiosList[0].id).toEqual(ids[0]);
      expect(studiosList[1].id).toEqual(ids[1]);
    });

    it('should also support filtering by name param', () => {
      const ids = ['Rc5hZk9hhN', 'ur6BO5ei2p7'];
      const studiosList = studios.findByIds(ids, {
        name: 'walt'
      });

      expect(studiosList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support ascending orderBy param', () => {
      const ids = ['Rc5hZk9hhN', 'ur6BO5ei2p7'];
      const studiosList = studios.findByIds(ids, {
        orderBy: 'foundedIn_ASC'
      });

      expect(studiosList[0].foundedIn).toBeLessThanOrEqual(
        studiosList[1].foundedIn
      );
    });

    it('should support descending orderBy param', () => {
      const ids = ['Rc5hZk9hhN', 'ur6BO5ei2p7'];
      const studiosList = studios.findByIds(ids, {
        orderBy: 'foundedIn_DESC'
      });

      expect(studiosList[0].foundedIn).toBeGreaterThanOrEqual(
        studiosList[1].foundedIn
      );
    });
  });
});
