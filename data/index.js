const { createComparison } = require('./create-comparison');
const { getComparison, getComparisons } = require('./read-comparison');
const { deleteComparison } = require('./delete-comparison');

module.exports = {
  createComparison,
  getComparisons,
  getComparison,
  deleteComparison,
}
