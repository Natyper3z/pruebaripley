'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKey = exports.getList = exports.setList = exports.setKeys = exports.setKey = exports.allKey = undefined;

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Time to live; defines time before a key in redis expires
var TTL = 60;
// Defines maximum size of users visited products
var MAX_SIZE = 4;

var allKey = exports.allKey = 'ALL';

// Use default redis://127.0.0.1/6379 or env variable
var client = _redis2.default.createClient(process.env.REDIS_URL || null);
client.on('connect', function () {
  console.log('connected to redis client');
});

// Store a single key in redis.
// Keys will be the product partNumber
var setKey = exports.setKey = function setKey(key, value) {
  var expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  // Set the key and an expiring time for key
  client.set(key, value, function () {
    if (expire) {
      client.expire(key, TTL);
    }
  });
};

// Store multiple keys based on array.
// values element must contain partNumber property.
var setKeys = exports.setKeys = function setKeys() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  values.forEach(function (value) {
    var parsed = JSON.stringify(value);
    setKey(value.partNumber, parsed);
  });
};

// Create a list of unique elements with MAX_SIZE as limit
// value must be string
var setList = exports.setList = function setList(key, value) {
  // Remove the element of the list if it exists
  client.lrem(key, 0, value, function () {
    // push the new element
    client.lpush(key, value, function () {
      // After the insertion, we trim list to limit elements;
      // We remove the first element inserted, by keeping the range of 0 to MAX_SIZE - 1
      // (list index starts on 0)
      client.ltrim(key, 0, MAX_SIZE - 1);
    });
  });
};

// Get elements from list
var getList = exports.getList = function getList(key) {
  return new Promise(function (resolve, reject) {
    // this methods returns an array of string
    client.lrange(key, 0, -1, function (error, result) {
      if (error || result.length === 0) {
        return reject();
      }
      return resolve(result);
    });
  });
};

// Get a key from REDIS
// returns a promise with value, or rejects if no value was found or if there was an error
var getKey = exports.getKey = function getKey(key) {
  return new Promise(function (resolve, reject) {
    client.get(key, function (error, result) {
      if (error || !result) {
        return reject();
      }
      return resolve(result);
    });
  });
};

exports.default = client;