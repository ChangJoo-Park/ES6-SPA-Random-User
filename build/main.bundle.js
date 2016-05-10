/*
* @Author: changjoopark
* @Date:   2016-05-10 17:50:32
* @Last Modified by:   changjoopark
* @Last Modified time: 2016-05-10 18:06:18
*/

'use strict';

var _contactServiceMock = require('./contact-service-mock');

var service = _interopRequireWildcard(_contactServiceMock);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function () {
  alert('hi');
})();
