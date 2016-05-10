/*
* @Author: changjoopark
* @Date:   2016-05-10 18:09:49
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 21:19:48
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
    const html = `<div class='contact-${this.contact.id} col-sm-4 col-md-3'>
      <div class="thumbnail">
        <img src="http://lorempixel.com/400/200/"/>
        <div class="caption">
          ${nameDOM}
        </div>
        ${addressDOM}
        ${phoneDOM}
      </div>
    </div>`;
    return html;
  }

  domBasicProfile() {
    const name = `${this.contact.firstName} ${this.contact.lastName}`;
    const age = `(${this.contact.age})`;
    return `<h3>${name} ${age}</h3>`;
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
