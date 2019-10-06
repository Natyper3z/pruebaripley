'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redisClient = require('../services/redis-client');

// Reads data from REDIS
// if type is allKey, returns its key
// otherwise, read partNumber in requested URI
var cacheReader = function cacheReader(type) {
  return function (req, res, next) {
    if (type === _redisClient.allKey) {
      // We need to see if allkey exits in redis
      return (0, _redisClient.getKey)(_redisClient.allKey).then(function (result) {
        // if we got a result, send inmediately to user.
        var parsed = JSON.parse(result);
        res.send(parsed);
      }).catch(function () {
        // in case of error retreiven key or missing content, we go to the method
        next();
      });
    }

    // If type is different than allKey, we search in params
    var partNumber = req.params.partNumber,
        ip = req.ip;

    // if no partNumber found in url, go to next method.

    if (!partNumber) {
      next();
      return null;
    }

    return (0, _redisClient.getKey)(partNumber).then(function (result) {
      // Add the item to visted
      (0, _redisClient.setList)(ip, result, false);
      // if we got a result, send inmediately to user.
      var parsed = JSON.parse(result);
      res.send(parsed);
    }).catch(function () {
      // in case of error retreiven key or missing content, we go to the method
      next();
    });
  };
};

exports.default = cacheReader;