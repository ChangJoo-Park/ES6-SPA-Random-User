/*
* @Author: changjoopark
* @Date:   2016-05-10 17:57:01
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 21:47:55
*/

'use strict';

let contacts = undefined;

export let findAll = () => new Promise((resolve, reject) => {
    if(contacts === undefined) {
      getJSON('http://api.randomuser.me/?results=25')
      .then(function (data) {
        console.log(data);
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

export let findByName = (queryText) => new Promise((resolve, reject) => {
    if (queryText.trim() === '') {
      resolve(contacts.results);
    } else if (queryText.length > 0) {
      const q = queryText.trim().toLowerCase();
      let result = [];
      contacts.results.forEach((contact) => {
        if (contact.name.first.toLowerCase().match(q) ||
          contact.name.last.toLowerCase().match(q)) {
          result.push(contact);
        }
      });
      if (result.length > 0) {
        resolve(result);
      } else {
        reject({
          message: `Can't find mathched : ${queryText}`
        });
      }
    }
  });


function getJSON(url) {
  'use strict';
  var xhr = new XMLHttpRequest();
  var d = Promise.defer();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        d.resolve(JSON.parse(xhr.responseText));
      } else {
        d.reject(xhr.responseText);
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
  return d.promise;
}
