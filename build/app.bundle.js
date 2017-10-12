/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: changjoopark
	* @Date:   2016-05-10 17:50:32
	* @Last Modified by:   ChangJoo Park
	* @Last Modified time: 2016-05-10 21:13:44
	*/
	
	'use strict';
	
	var _contactServiceMock = __webpack_require__(1);
	
	var service = _interopRequireWildcard(_contactServiceMock);
	
	var _contactDom = __webpack_require__(29);
	
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

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

	/*
	* @Author: changjoopark
	* @Date:   2016-05-10 17:57:01
	* @Last Modified by:   ChangJoo Park
	* @Last Modified time: 2016-05-10 21:47:55
	*/
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var contacts = undefined;
	
	var findAll = exports.findAll = function findAll() {
	  return new Promise(function (resolve, reject) {
	    if (contacts === undefined) {
	      getJSON('http://api.randomuser.me/?results=25').then(function (data) {
	        contacts = data;
	        resolve(contacts.results);
	      });
	    } else {
	      if (contacts) {
	        resolve(contacts.results);
	      } else {
	        reject("No Contacts");
	      }
	    }
	  });
	};
	
	var findByName = exports.findByName = function findByName(queryText) {
	  return new Promise(function (resolve, reject) {
	    if (queryText.trim() === '') {
	      resolve(contacts.results);
	    } else if (queryText.length > 0) {
	      var q = queryText.trim().toLowerCase();
	      var result = [];
	      contacts.results.forEach(function (contact) {
	        if (contact.name.first.toLowerCase().match(q) || contact.name.last.toLowerCase().match(q)) {
	          result.push(contact);
	        }
	      });
	      if (result.length > 0) {
	        resolve(result);
	      } else {
	        reject({
	          message: 'Can\'t find mathched : ' + queryText
	        });
	      }
	    }
	  });
	};
	
	function getJSON(url) {
	  return new Promise(function (resolve, reject) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function () {
	      if (xhr.readyState === 4) {
	        if (xhr.status === 200) {
	          resolve(JSON.parse(xhr.responseText));
	        } else {
	          reject(xhr.responseText);
	        }
	      }
	    };
	    xhr.open('GET', url);
	    xhr.send();
	  });
	}

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

	/*
	* @Author: changjoopark
	* @Date:   2016-05-10 18:09:49
	* @Last Modified by:   ChangJoo Park
	* @Last Modified time: 2016-05-10 21:47:18
	*/
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ContactDOM = function () {
	  function ContactDOM(contact) {
	    _classCallCheck(this, ContactDOM);
	
	    this.contact = contact;
	  }
	
	  _createClass(ContactDOM, [{
	    key: 'domBasicProfile',
	    value: function domBasicProfile() {
	      var name = this.contact.name;
	      return '<h3>' + name.first + ' ' + name.last + '</h3>';
	    }
	  }, {
	    key: 'domAddress',
	    value: function domAddress() {
	      var address = this.contact.location;
	      return '<div class=\'address\'>\n      <p>City : ' + address.city + '</p>\n      <p>Postal Code : ' + address.postcode + '</p>\n      <p>State : ' + address.state + '</p>\n      <p>Street : ' + address.street + '</p>\n    </div>';
	    }
	  }, {
	    key: 'domPhone',
	    value: function domPhone() {
	      var phones = [];
	      phones.push({ type: 'phone', number: this.contact.phone });
	      phones.push({ type: 'cell', number: this.contact.cell });
	      var html = '<div class="phones"><ul>';
	      phones.forEach(function (phone) {
	        var dom = '<li>' + phone.type + ' : ' + phone.number + '</li>';
	        html += dom;
	      });
	      html += '</ul></div>';
	      return html;
	    }
	  }, {
	    key: 'domObject',
	    get: function get() {
	      var nameDOM = this.domBasicProfile();
	      var addressDOM = this.domAddress();
	      var phoneDOM = this.domPhone();
	      var html = '<div class=\'contact-' + this.contact.id + ' col-sm-6 col-md-4\'>\n      <div class="thumbnail">\n        <img src="' + this.contact.picture.large + '"/>\n        <div class="caption">\n          ' + nameDOM + '\n        </div>\n        ' + addressDOM + '\n        ' + phoneDOM + '\n      </div>\n    </div>';
	      return html;
	    }
	  }]);
	
	  return ContactDOM;
	}();
	
	exports.default = ContactDOM;

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map