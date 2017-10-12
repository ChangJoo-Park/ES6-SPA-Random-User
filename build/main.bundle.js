/*
* @Author: changjoopark
* @Date:   2016-05-10 17:50:32
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 21:13:44
*/

'use strict';

var _contactServiceMock = require('./contact-service-mock');

var service = _interopRequireWildcard(_contactServiceMock);

var _contactDom = require('./contact-dom');

var _contactDom2 = _interopRequireDefault(_contactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

document.addEventListener('DOMContentLoaded', function () {
  service.findAll().then(function (contacts) {
    loadContact(contacts);
  });
});

//  Click Contact Reload button
document.getElementById('reloadContacts').addEventListener('click', function () {
  document.getElementById('flash').innerHTML = '';
  document.getElementById('searchContactQuery').value = '';
  service.findAll().then(function (contacts) {
    loadContact(contacts);
  });
});

document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('flash').innerHTML = '';

  var queryText = document.getElementById('searchContactQuery');
  service.findByName(queryText.value).then(function (contacts) {
    loadContact(contacts);
  }).catch(function (error) {
    document.getElementById('flash').innerHTML = '<div class="alert alert-danger" role="alert">' + error.message + '</div>';
    queryText.value = "";
  });
});

function loadContact(contacts) {
  var html = '';
  contacts.forEach(function (contact) {
    var contactDOM = new _contactDom2.default(contact);
    html += contactDOM.domObject;
  });
  document.getElementById('contacts').innerHTML = html;
};
