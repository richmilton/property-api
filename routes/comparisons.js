const express = require('express');
const router = express.Router();
const {
  createComparison,
  getComparisons,
  getComparison,
  deleteComparison,
} = require('../data');

const setHeaders = (res, req) => {
  const whiteList = process.env.ORIGIN_WHITE_LIST.split('~');
  const origin = req.get('origin');
  if (whiteList.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  }
};

const errorMap = {
  ECONNREFUSED: { status: 503, message: 'database not available' },
  UNKNOWN: { status: 500, message: 'unknown internal server error' },
};

const getError = (errCode) => {
  return errorMap[errCode] || errorMap.UNKNOWN;
};

router.get('/:id', (req, res) => {
  setHeaders(res, req);
  console.log(req.params.id);
  getComparison(req.params.id, res);
});

router.get('/', (req, res) => {
  setHeaders(res, req);
  getComparisons(
    (errCode) => {
      const { status, message } = getError(errCode);
      res.status(status).send(message);
    },
    (data) => res.send(data)
  );
});

router.put('/', (req, res) => {
  setHeaders(res, req);
  createComparison(req.body,
    (errCode) => {
      const { status, message } = getError(errCode);
      res.status(status).send(message);
    },
    (data) => res.send(data)
  );
});

router.delete('/', (req, res) => {
  setHeaders(res, req);
  deleteComparison(
    req.body.id,
    (errCode) => {
      const { status, message } = getError(errCode);
      res.status(status).send(message);
    },
    (respCode) => res.send(respCode)
  );
});

router.options('/', (req, res) => {
  setHeaders(res, req);
  res.send(200);
});

module.exports = router;
