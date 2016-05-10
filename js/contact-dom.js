/*
* @Author: changjoopark
* @Date:   2016-05-10 18:09:49
* @Last Modified by:   changjoopark
* @Last Modified time: 2016-05-10 19:35:46
*/

'use strict';

export default class ContactDOM  {
  constructor(contact) {
    this.contact = contact;
  }

  get domObject() {
    const nameDOM = this.domBasicProfile();
    const addressDOM = this.domAddress();
    const phoneDOM = this.domPhone();
    const html = `<div class='contact-${this.contact.id}'>
      ${nameDOM}
      ${addressDOM}
      ${phoneDOM}
    </div>`;
    return html;
  }

  domBasicProfile() {
    const name = `${this.contact.firstName} ${this.contact.lastName}`;
    const age = `(${this.contact.age})`;
    return `<div class='basic'>
      <p>${name} ${age}</p>
    </div>`;
  }

  domAddress() {
    const address = this.contact.address;
    return `<div class='address'>
      <p>City : ${address.city}</p>
      <p>Postal Code : ${address.postalCode}</p>
      <p>State : ${address.state}</p>
      <p>Street : ${address.streetAddress}</p>
    </div>`;
  }

  domPhone() {
    const phones = this.contact.phoneNumber;
    let html = '<div class="phones"><ul>';
    phones.forEach((phone)=>{
      var dom = `<li>${phone.type} : ${phone.number}</li>`;
      html += dom;
    });
    html += '</ul></div>';
    return html;
  }
}
