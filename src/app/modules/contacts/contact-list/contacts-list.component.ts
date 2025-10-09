import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contact.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, TableModule],
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm = '';

  constructor(
    private contactService: ContactsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contacts = this.contactService.getContacts();
    this.filteredContacts = [...this.contacts];
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredContacts = this.contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.phone.toLowerCase().includes(term)
    );
  }

  addContact() {
    this.router.navigate(['/contacts/add']);
  }
}
