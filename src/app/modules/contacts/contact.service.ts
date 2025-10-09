import { Injectable } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private contacts: Contact[] = [
    {
      id: 1,
      name: 'Ahmed Ali',
      email: 'ahmed@gmail.com',
      phone: '01123456789',
    },
    {
      id: 2,
      name: 'Sara Mohamed',
      email: 'sara@gmail.com',
      phone: '01098765432',
    },
  ];

  getContacts() {
    return this.contacts;
  }

  addContact(contact: Contact) {
    contact.id = this.contacts.length + 1;
    this.contacts.push(contact);
  }
}
