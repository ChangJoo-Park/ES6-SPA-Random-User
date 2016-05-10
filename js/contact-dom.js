/*
* @Author: changjoopark
* @Date:   2016-05-10 18:09:49
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 21:47:18
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
    const html = `<div class='contact-${this.contact.id} col-sm-6 col-md-4'>
      <div class="thumbnail">
        <img src="${this.contact.picture.large}"/>
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
    const name = this.contact.name;
    return `<h3>${name.first} ${name.last}</h3>`;
  }

  domAddress() {
    const address = this.contact.location;
    return `<div class='address'>
      <p>City : ${address.city}</p>
      <p>Postal Code : ${address.postcode}</p>
      <p>State : ${address.state}</p>
      <p>Street : ${address.street}</p>
    </div>`;
  }

  domPhone() {
    let phones = [];
    phones.push({type: 'phone', number: this.contact.phone });
    phones.push({type: 'cell', number: this.contact.cell });
    let html = '<div class="phones"><ul>';
    phones.forEach((phone)=>{
      var dom = `<li>${phone.type} : ${phone.number}</li>`;
      html += dom;
    });
    html += '</ul></div>';
    return html;
  }
}
