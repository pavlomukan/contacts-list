import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {
  private contacts: Contact[];

  constructor() {
    const storageContacts = localStorage.getItem('contacts');
    if (storageContacts) {
      this.contacts = JSON.parse(storageContacts);
    } else {
      localStorage.setItem('contacts', JSON.stringify(INIT_DATA));
      this.contacts = INIT_DATA;
    }
  }

  getContacts() {
    return this.contacts;
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  deleteContact(id: string) {
    this.contacts = this.contacts.filter((c: Contact) => c.id !== id)
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  editContact(contact: Contact) {
    const index = this.contacts.findIndex((c: Contact) => c.id === contact.id)
    this.contacts[index] = contact
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
}

export interface Contact {
  id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  email: string;
  address: string;
  postCode: number;
}

const INIT_DATA: Contact[] = [
  {
    id: 'cb1d52a2-5d7b-4c0d-aa7b-eeca84c7e4d8',
    name: 'Alina',
    lastName: 'Matvieva',
    phoneNumber: '+380532806551',
    dateOfBirth: '05/12/2002', //new Date('2002-05-12'),
    email: 'alina@gmail.com',
    address: 'Lviv, Ukraine',
    postCode: 78100
  },
  {
    id: '131844b6-6d50-4111-8074-c1bfd83ad6ad',
    name: 'Max',
    lastName: 'Kozak',
    phoneNumber: '+380532806321',
    dateOfBirth:'09/22/2002',
    email: 'max@gmail.com',
    address: 'Lviv, Ukraine',
    postCode: 78101
  }
]
