/*
* @Author: changjoopark
* @Date:   2016-05-10 17:57:01
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 20:58:36
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
},
{
  "id": 3,
  "firstName": "ABCD",
  "lastName": "HHHH",
  "age": 79,
  "address":
  {
     "streetAddress": "Somewhere",
     "city": "London",
     "state": "GB",
     "postalCode": "123456"
  },
  "phoneNumber": [
   {
     "type": "home",
     "number": "212 555-1234"
   },
   {
     "type": "fax",
     "number": "222 555-1234"
   },
   {
     "type": "cell phone",
     "number": "222 555-1234"
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
  if(queryText.trim() === '') {
    resolve(contacts);
  } else if(queryText.length > 0) {
    const q = queryText.trim().toLowerCase();
    let result = [];
    contacts.forEach((contact)=>{
      if(contact.firstName.toLowerCase().match(q)  ||
         contact.lastName.toLowerCase().match(q)) {
        result.push(contact);
      }
    });
    if(result.length > 0) {
      resolve(result);
    } else {
      reject({message: `Can't find mathched : ${queryText}`});
    }
  }
});
