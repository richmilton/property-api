const express = require('express');
const router = express.Router();
const {
  createComparison,
  getComparisons,
  getComparison,
  deleteComparison,
} = require('../data');

const setHeaders = (res, req, isOptions) => {
  const { email = ''} = req.params.email ? req.params : req.body;
  const whiteList = process.env.ORIGIN_WHITE_LIST.split('~');
  const emailWhiteList = process.env.EMAIL_WHITE_LIST.split('~');
  if (!isOptions && emailWhiteList.indexOf(email) === -1) {
    res.status(403).end();
    return false;
  }
  const origin = req.get('origin');
  if (whiteList.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    return true;
  }
  res.status(403).end();
  return false;
};

const errorMap = {
  ECONNREFUSED: { status: 503, message: 'database not available' },
  UNKNOWN: { status: 500, message: 'unknown internal server error' },
};

const getError = (errCode) => {
  return errorMap[errCode] || errorMap.UNKNOWN;
};

router.get('/:id', (req, res) => {
  if (setHeaders(res, req)) {
    console.log(req.params.id);
    getComparison(req.params.id, res);
  }
});

router.get('/user/:email', (req, res) => {
  if (setHeaders(res, req)) {
    const emailDomain = req.params.email.split('@')[1];
    getComparisons(
      (errCode) => {
        const {status, message} = getError(errCode);
        res.status(status).send(message);
      },
      (data) => {
        filteredData = {
          Items: data.Items.filter(({ email }) => email.split('@')[1] === emailDomain)
        };
        res.send(filteredData);
      }
    );
  }
});

router.put('/', (req, res) => {
  if (setHeaders(res, req)) {
    createComparison(req.body,
      (errCode) => {
        const {status, message} = getError(errCode);
        res.status(status).send(message);
      },
      (data) => res.send(data)
    );
  }
});

router.delete('/', (req, res) => {
  if (setHeaders(res, req)) {
    deleteComparison(
      req.body.id,
      (errCode) => {
        const {status, message} = getError(errCode);
        res.status(status).send(message);
      },
      (respCode) => res.send(respCode)
    );
  }
});

router.options('/', (req, res) => {
  if (setHeaders(res, req, true)) {
    res.send(200);
  }
});

module.exports = router;
