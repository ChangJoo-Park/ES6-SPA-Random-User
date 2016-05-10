/*
* @Author: changjoopark
* @Date:   2016-05-10 17:50:32
* @Last Modified by:   changjoopark
* @Last Modified time: 2016-05-10 19:35:30
*/

'use strict';
import * as service from './contact-service-mock';
import ContactDOM from './contact-dom';

document.addEventListener('DOMContentLoaded', function () {
  loadContact();
});

//  Click Contact Reload button
document.getElementById('reloadContacts').addEventListener('click', ()=> {
  loadContact();
});

document.getElementById('searchContact').addEventListener('click', ()=> {
  console.log("Hi");
});

function loadContact() {
  service.findAll().then((contacts)=>{
    let html = "";
    contacts.forEach((contact)=>{
      let contactDOM = new ContactDOM(contact);
      html += contactDOM.domObject;
    });
    document.getElementById('contacts').innerHTML = html;
  });
}
