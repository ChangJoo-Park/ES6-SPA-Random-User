/*
* @Author: changjoopark
* @Date:   2016-05-10 17:50:32
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 21:13:44
*/

import * as service from './contact-service-mock';
import ContactDOM from './contact-dom';

const findId = id => document.getElementById(id);
const loadContact = contacts => findId('contacts').innerHTML = contacts.reduce((p, contact) => p + new ContactDOM(contact).domObject, '');

document.addEventListener('DOMContentLoaded', _ => service.findAll()
  .then(contacts => loadContact(contacts)));

//  Click Contact Reload button
findId('reloadContacts').addEventListener('click', _ => {
  findId('flash').innerHTML = '';
  findId('searchContactQuery').value = '';

  service.findAll().then(contacts => loadContact(contacts));
});

findId('searchForm').addEventListener('submit', e => {
  e.preventDefault();
  findId('flash').innerHTML = '';

  const queryText = findId('searchContactQuery');
  service.findByName(queryText.value)
    .then(contacts => loadContact(contacts))
    .catch(({message}) => {
      findId('flash').innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
      queryText.value = "";
    });
});