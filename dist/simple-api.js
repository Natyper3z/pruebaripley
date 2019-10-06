'use strict';

module.exports = function () {
  var apiRoute = 'https://simple.ripley.cl/api/v2';

  return {
    byId: function byId(id) {
      return apiRoute + '/products/by-id/' + id;
    },
    byPartNumber: function byPartNumber(partNumber) {
      return apiRoute + '/products/' + partNumber;
    },
    byPartNumbers: function byPartNumbers(partNumbers) {
      return apiRoute + '/products?partNumbers=' + partNumbers;
    }
  };
};