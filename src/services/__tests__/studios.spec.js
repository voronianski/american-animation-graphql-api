const studios = require('../studios');

describe('studios service', () => {
  it('should exist', () => {
    expect(studios).toEqual(expect.any(Object));
  });

  it('should get list of all available studios', () => {
    const studiosList = studios.getAll({});

    expect(studiosList.length).toBeGreaterThanOrEqual(1);
  });
});
