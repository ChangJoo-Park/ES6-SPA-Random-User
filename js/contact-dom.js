/*
* @Author: changjoopark
* @Date:   2016-05-10 18:09:49
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 21:47:18
*/

export default class ContactDOM {
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
    const {first, last} = this.contact.name;
    return `<h3>${first} ${last}</h3>`;
  }

  domAddress() {
    const {city, postcode, state, street} = this.contact.location;
    return `<div class='address'>
      <p>City : ${city}</p>
      <p>Postal Code : ${postcode}</p>
      <p>State : ${state}</p>
      <p>Street : ${street}</p>
    </div>`;
  }

  domPhone() {
    const phones = [];
    phones.push({type: 'phone', number: this.contact.phone});
    phones.push({type: 'cell', number: this.contact.cell});

    const liEls = phones.reduce((p, {type, number}) => p + `<li>${type} : ${number}</li>`, '');
    return `<div class="phones">
      <ul>${liEls}</ul>
    </div>`;
  }
}