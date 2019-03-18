const express = require('express');
const router = express.Router();
const {
  createComparison,
  getComparisons,
  getComparison,
  deleteComparison,
} = require('../data')

const setHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
};

const errorMap = {
  ECONNREFUSED: { status: 503, message: 'database not available' },
  UNKNOWN: { status: 500, message: 'unknown internal server error' },
};

const getError = (errCode) => {
  return errorMap[errCode] || errorMap.UNKNOWN;
}

router.get('/:id', (req, res) => {
  setHeaders(res);
  console.log(req.params.id);
  getComparison(req.params.id, res);
});

router.get('/', (req, res) => {
  setHeaders(res);
  getComparisons(
    (errCode) => {
      const { status, message } = getError(errCode);
      res.status(status).send(message);
    },
    (data) => res.send(data)
  );
});

router.put('/', (req, res) => {
  setHeaders(res);
  createComparison(req.body,
    (errCode) => {
      const { status, message } = getError(errCode);
      res.status(status).send(message);
    },
    (data) => res.send(data)
  );
});

router.delete('/', (req, res) => {
  setHeaders(res);
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
  setHeaders(res);
  res.send(200);
});

module.exports = router;
