/*
* @Author: changjoopark
* @Date:   2016-05-10 17:50:32
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 21:13:44
*/

'use strict';
import * as service from './contact-service-mock';
import ContactDOM from './contact-dom';

document.addEventListener('DOMContentLoaded', function () {
  service.findAll().then((contacts) => {
    loadContact(contacts);
  });
});

//  Click Contact Reload button
document.getElementById('reloadContacts').addEventListener('click', () => {
  document.getElementById('flash').innerHTML = '';
  document.getElementById('searchContactQuery').value = '';
  service.findAll().then((contacts) => {
    loadContact(contacts);
  });
});

document.getElementById('searchForm').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('flash').innerHTML = '';

  const queryText = document.getElementById('searchContactQuery');
  service.findByName(queryText.value).then((contacts) => {
    loadContact(contacts);
  }).catch((error) => {
    document.getElementById('flash').innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
    queryText.value = "";
  });
});

function loadContact(contacts) {
  let html = '';
  contacts.forEach((contact) => {
    let contactDOM = new ContactDOM(contact);
    html += contactDOM.domObject;
  });
  document.getElementById('contacts').innerHTML = html;
};
