const utils = require('../utils');

describe('utils for services', () => {
  it('should exist', () => {
    expect(utils).toEqual(expect.any(Object));
  });

  describe('getSort method', () => {
    it('it should exist', () => {
      expect(utils.getSort).toEqual(expect.any(Function));
    });

    it('should return default value without orderBy param passed', () => {
      expect(utils.getSort()).toMatchObject({
        key: 'name',
        order: 'asc'
      });
    });

    it('should return proper values when orderBy param passed', () => {
      expect(utils.getSort('keyName_DESC')).toMatchObject({
        key: 'keyName',
        order: 'desc'
      });
    });
  });
});
