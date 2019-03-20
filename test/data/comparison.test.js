// const expect = require('chai').expect;
// const load = require('../../data/load-comparison');
const del = require('../../data/delete-comparison');
// const data = require('./test-data-comparison');


describe('delete-comparison.deleteComp()', function () {
  it('should return 200', () => {
    del.deleteComp('1551973089978', (d) => {
      console.log(d);
    })
  });
});
