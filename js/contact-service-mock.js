/*
* @Author: changjoopark
* @Date:   2016-05-10 17:57:01
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 20:02:36
*/

'use strict';

let contacts = [
{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "age": 25,
  "address":
  {
     "streetAddress": "21 2nd Street",
     "city": "New York",
     "state": "NY",
     "postalCode": "10021"
  },
  "phoneNumber": [
   {
     "type": "home",
     "number": "212 555-1234"
   },
   {
     "type": "fax",
    "number": "646 555-4567"
   }
  ]
},
{
  "id": 2,
  "firstName": "ChangJoo",
  "lastName": "Park",
  "age": 29,
  "address":
  {
     "streetAddress": "Ringslebenstr. 2",
     "city": "Berlin",
     "state": "BR",
     "postalCode": "12353"
  },
  "phoneNumber": [
   {
     "type": "home",
     "number": "212 555-1234"
   },
  ]
}

];

export let findAll = () => new Promise((resolve, reject) => {
  if(contacts) {
    resolve(contacts);
  } else {
    reject("No Contacts");
  }
});

export let findByName = (queryText) => new Promise((resolve, reject) => {
  console.log(queryText)
  if(queryText.trim() === '') {
    resolve(contacts);
  } else if(queryText.length > 0) {
    console.log('queryText has exists');
    const q = queryText.trim();
    let result = [];
    contacts.forEach((contact)=>{
      if(contact.firstName === q || contact.lastName === q) {
        result.push(contact);
      }
    });
    resolve(result);
  } else {
    reject("No Contacts");
  }
});
