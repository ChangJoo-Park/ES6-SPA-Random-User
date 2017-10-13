/*
* @Author: changjoopark
* @Date:   2016-05-10 17:57:01
* @Last Modified by:   ChangJoo Park
* @Last Modified time: 2016-05-10 21:47:55
*/

let contacts = undefined;
const DATA_URL = 'https://randomuser.me/api?result=25';

const t = str => str.trim();
const tlc = str => t(str).toLowerCase();
const tm = (str, q) => tlc(str).match(q);

const getJSON = url => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = _ => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.responseText);
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
});

export const findAll = () => new Promise((resolve, reject) => {
  if (contacts === undefined) {
    getJSON(DATA_URL).then(data => {
      contacts = data;
      resolve(contacts.results);
    });
  } else {
    contacts ?
      resolve(contacts.results) :
      reject('No Contacts');
  }
});

export const findByName = queryText => new Promise((resolve, reject) => {
  if (t(queryText) === '') {
    resolve(contacts.results);
  } else if (queryText.length > 0) {
    const q = tlc(queryText);
    const result = contacts.results.reduce((p, contact) => {
      const {first, last} = contact.name;
      if (tm(first, q) || tm(last, q)) {
        p.push(contact);
      }

      return p;
    }, []);

    if (result.length > 0) {
      resolve(result);
    } else {
      reject({message: `Can't find matched : ${queryText}`});
    }
  }
});