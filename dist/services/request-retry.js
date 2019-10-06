'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIMULATED_ERROR_RATE = 10; // 10% de error

var requestRetrier = function requestRetrier(options) {
  return new Promise(function (resolve) {
    (0, _request2.default)(options, function (error, r, response) {
      if (error) {
        return resolve(requestRetrier(options));
      }
      // Genera un INT  entre 0 y 100
      // Error
      if (Math.floor(Math.random() * 100) < SIMULATED_ERROR_RATE) {
        return resolve(requestRetrier(options));
      }
      return resolve(response);
    });
  });
};

exports.default = requestRetrier;