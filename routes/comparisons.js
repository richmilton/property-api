const express = require('express');
const router = express.Router();
const load = require('../data/load-comparison');
const read = require('../data/read-comparison');
const deleteComp = require('../data/delete-comparison');

const setHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
};

router.get('/:id', (req, res) => {
  setHeaders(res);
  console.log(req.params.id);
  read.get(req.params.id, res);
});

router.get('/', (req, res) => {
  setHeaders(res);
  read.scan(res);
});

router.put('/', (req, res) => {
  setHeaders(res);
  load.load(req.body, (comparison) => res.send(comparison));
});

router.delete('/', (req, res) => {
  setHeaders(res);
  deleteComp.deleteComp(req.body.id, (respCode) => res.send(respCode));
});

router.options('/', (req, res) => {
  setHeaders(res);
  res.send(200);
});

module.exports = router;
