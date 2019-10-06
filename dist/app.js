'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sku = require('./sku');

var _simpleApi = require('./simple-api');

var _simpleApi2 = _interopRequireDefault(_simpleApi);

var _redisClient = require('./services/redis-client');

var _requestRetry = require('./services/request-retry');

var _requestRetry2 = _interopRequireDefault(_requestRetry);

var _cacheReader = require('./middleware/cacheReader');

var _cacheReader2 = _interopRequireDefault(_cacheReader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());

// Serve static files from react client
app.use(_express2.default.static(__dirname + '/../client/build'));

// Get all products (from a SKU list)
app.get('/api/products', (0, _cacheReader2.default)(_redisClient.allKey), function (_, res) {
  // Take ["a", "b", ...] to "a,b,..."
  // This should be a Model query or something like that
  var partNumbers = _sku.skus.join(',');
  var uri = (0, _simpleApi2.default)().byPartNumbers(partNumbers);
  // do request. (json: {} parse the response body automatically)
  var request = { uri: uri, method: 'GET', json: {} };
  return (0, _requestRetry2.default)(request).then(function (body) {
    // Set redis cache before sending data.
    // First we store SKUs retrieved from API.
    (0, _redisClient.setKey)(_redisClient.allKey, JSON.stringify(body));
    // Then we set every individual key, as the info is the same.
    (0, _redisClient.setKeys)(body);
    return res.send(body);
  });
});

// Get an specific product info
app.get('/api/products/:partNumber', (0, _cacheReader2.default)(), function (req, res) {
  var partNumber = req.params.partNumber,
      ip = req.ip;

  var uri = (0, _simpleApi2.default)().byPartNumber(partNumber);
  var request = { uri: uri, method: 'GET', json: {} };
  return (0, _requestRetry2.default)(request).then(function (body) {
    // Set redis cache before sending data.
    var value = JSON.stringify(body);
    (0, _redisClient.setKey)(body.partNumber, value);
    // Set redis cache for user visited products
    (0, _redisClient.setList)(ip, value);
    return res.send(body);
  });
});

// Get visited product list
app.get('/api/visited', function (req, res) {
  var ip = req.ip;

  return (0, _redisClient.getList)(ip).then(function (result) {
    var parsed = result.map(function (element) {
      return JSON.parse(element);
    });
    res.send(parsed);
  }).catch(function () {
    return res.send([]);
  });
});

// For non matching routes, serve index
app.get('*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '/../client/build/index.html'));
});

app.listen(process.env.PORT || 5000);