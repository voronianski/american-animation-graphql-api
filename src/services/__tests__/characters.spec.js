const characters = require('../characters');

describe('characters service', () => {
  it('should exist', () => {
    expect(characters).toEqual(expect.any(Object));
  });

  describe('getAll method', () => {
    it('should exist', () => {
      expect(characters.getAll).toEqual(expect.any(Function));
    });

    it('should get list of all available characters', () => {
      const charactersList = characters.getAll({});

      expect(charactersList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support ascending orderBy param', () => {
      const charactersList = characters.getAll({
        orderBy: 'createdIn_ASC'
      });

      expect(charactersList[0].createdIn).toBeLessThanOrEqual(
        charactersList[1].createdIn
      );
    });

    it('should support descending orderBy param', () => {
      const charactersList = characters.getAll({
        orderBy: 'createdIn_DESC'
      });

      expect(charactersList[0].createdIn).toBeGreaterThanOrEqual(
        charactersList[1].createdIn
      );
    });
  });

  describe('findByName method', () => {
    it('should exist', () => {
      expect(characters.findByName).toEqual(expect.any(Function));
    });

    it('should get list of characters that match provided name', () => {
      const charactersList = characters.findByName('duck', {});

      expect(charactersList.length).toBeGreaterThanOrEqual(2);
    });

    it('should support ascending orderBy param', () => {
      const charactersList = characters.findByName('duck', {
        orderBy: 'createdIn_ASC'
      });

      expect(charactersList[0].createdIn).toBeLessThanOrEqual(
        charactersList[1].createdIn
      );
    });

    it('should support descending orderBy param', () => {
      const charactersList = characters.findByName('duck', {
        orderBy: 'createdIn_DESC'
      });

      expect(charactersList[0].createdIn).toBeGreaterThanOrEqual(
        charactersList[1].createdIn
      );
    });
  });

  describe('findByStudioId method', () => {
    it('should exist', () => {
      expect(characters.findByStudioId).toEqual(expect.any(Function));
    });

    it('should get list of characters that includes provided studio id', () => {
      const charactersList = characters.findByStudioId('NkZZU3YCwu7', {});

      expect(charactersList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support filtering by name param', () => {
      const charactersList = characters.findByStudioId('NkZZU3YCwu7', {
        name: 'duck'
      });

      expect(charactersList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support ascending orderBy param', () => {
      const charactersList = characters.findByStudioId('NkZZU3YCwu7', {
        orderBy: 'createdIn_ASC'
      });

      expect(charactersList[0].createdIn).toBeLessThanOrEqual(
        charactersList[1].createdIn
      );
    });

    it('should support descending orderBy param', () => {
      const charactersList = characters.findByStudioId('NkZZU3YCwu7', {
        orderBy: 'createdIn_DESC'
      });

      expect(charactersList[0].createdIn).toBeGreaterThanOrEqual(
        charactersList[1].createdIn
      );
    });
  });

  describe('findByVideoId method', () => {
    it('should exist', () => {
      expect(characters.findByVideoId).toEqual(expect.any(Function));
    });

    it('should get list of characters that includes provided video id', () => {
      const charactersList = characters.findByVideoId('9OxQsvoFyG', {});

      expect(charactersList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support filtering by name param', () => {
      const charactersList = characters.findByVideoId('hub4tFxaW-', {
        name: 'duck'
      });

      expect(charactersList.length).toBeGreaterThanOrEqual(1);
    });

    it('should support ascending orderBy param', () => {
      const charactersList = characters.findByVideoId('hub4tFxaW-', {
        orderBy: 'createdIn_ASC'
      });

      expect(charactersList[0].createdIn).toBeLessThanOrEqual(
        charactersList[1].createdIn
      );
    });

    it('should support descending orderBy param', () => {
      const charactersList = characters.findByVideoId('hub4tFxaW-', {
        orderBy: 'createdIn_DESC'
      });

      expect(charactersList[0].createdIn).toBeGreaterThanOrEqual(
        charactersList[1].createdIn
      );
    });
  });

  describe('findOneById method', () => {
    it('should exist', () => {
      expect(characters.findOneById).toEqual(expect.any(Function));
    });

    it('should find one item with valid id', () => {
      const id = 'FC210UIjz';
      const characterItem = characters.findOneById(id);

      expect(characterItem).toBeDefined();
      expect(characterItem).toHaveProperty('id', id);
    });
  });

  describe('findOneByName method', () => {
    it('should exist', () => {
      expect(characters.findOneByName).toEqual(expect.any(Function));
    });

    it('should find one item with matching name', () => {
      const name = 'Oswald the Lucky Rabbit';
      const characterItem = characters.findOneByName(name);

      expect(characterItem).toBeDefined();
      expect(characterItem).toHaveProperty('name', name);
    });
  });
});
