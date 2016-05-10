/*
* @Author: changjoopark
* @Date:   2016-05-10 17:50:32
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 20:24:57
*/

'use strict';
import * as service from './contact-service-mock';
import ContactDOM from './contact-dom';

document.addEventListener('DOMContentLoaded', function () {
  loadContact();
});

//  Click Contact Reload button
document.getElementById('reloadContacts').addEventListener('click', ()=> {
  document.getElementById('flash').innerHTML = '';
  document.getElementById('searchContactQuery').value = '';
  loadContact();
});

document.getElementById('searchForm').addEventListener('submit', (event)=> {
  event.preventDefault();
  document.getElementById('flash').innerHTML = '';
  const queryText = document.getElementById('searchContactQuery');
  service.findByName(queryText.value).then((contacts)=>{
    let html = '';
    contacts.forEach((contact)=>{
      let contactDOM = new ContactDOM(contact);
      html += contactDOM.domObject;
    });
    document.getElementById('contacts').innerHTML = html;
  }).catch((error)=>{
    document.getElementById('flash').innerHTML = error.message;
    queryText.value = "";
  });
});

function loadContact() {
  service.findAll().then((contacts)=>{
    let html = '';
    contacts.forEach((contact)=>{
      let contactDOM = new ContactDOM(contact);
      html += contactDOM.domObject;
    });
    document.getElementById('contacts').innerHTML = html;
  });
}
