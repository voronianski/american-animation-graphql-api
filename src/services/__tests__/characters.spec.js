const characters = require('../characters');

describe('characters service', () => {
  it('should exist', () => {
    expect(characters).toEqual(expect.any(Object));
  });

  it('should get list of all available characters', () => {
    const charactersList = characters.getAll({});

    expect(charactersList.length).toBeGreaterThanOrEqual(1);
  });
});
