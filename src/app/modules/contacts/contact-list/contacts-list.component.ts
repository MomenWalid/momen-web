import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contact.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { AddContactDialogComponent } from '../contact-dialog/aadd-contact-dialog.component';
import { ButtonModule } from 'primeng/button';

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
  imports: [FormsModule, CommonModule, TableModule, ButtonModule],
  providers: [DialogService],
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: any[] = [];
  searchTerm = '';
  sub!: Subscription;

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private http: HttpClient,
    private zone: NgZone,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getContacts();

    const channel = new BroadcastChannel('contacts');
    // onmessage means this will receive the events or messages
    channel.onmessage = (event) => {
      // this.zone this needed to detect the change and update data faster
      this.zone.run(() => {
        switch (event.data.type) {
          case 'add':
            // Here in add event add the new contact record to the contact list
            this.contacts.unshift(event.data.contact);
            break;
          case 'edit':
            // Here in edit event update the contact with the new data
            const contactIndexE = this.contacts.findIndex(
              (e) => e.id == event.data.contact.id
            );
            this.contacts[contactIndexE] = event.data.contact;
            break;
          case 'delete':
            // Here in delete event found the contact then delete it from the contact list
            const contactIndexD = this.contacts.findIndex(
              (e) => e.id == event.data.contact.id
            );
            this.contacts.splice(contactIndexD, 1);
            break;
        }
      });
    };
  }

  // if (event.data.type === 'add') {
  // }
  // if (event.data.type === 'edit') {
  // }
  // if (event.data.type === 'delete') {
  //   const contactIndex = this.filteredContacts.findIndex(
  //     (e) => e.id == event.data.contact.id
  //   );
  //   this.filteredContacts.splice(contactIndex, 1);
  // }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  getContacts() {
    this.http.get('momen-web/contacts_100.json').subscribe((res: any) => {
      console.log(res);
      this.contacts = res;
      this.filteredContacts = [...this.contacts];
    });
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
    window.open('/contacts/add', '_blank');
    // this.router.navigate(['/contacts/add']);
  }
  openRecord(contact: any) {
    const newWin = window.open('/contacts/edit', '_blank');
    newWin?.addEventListener('load', () => {
      newWin.history.replaceState(contact, '');
    });
  }

  openAddDialog() {
    this.dialogService.open(AddContactDialogComponent, {
      header: 'Add New Contact',
      width: '600px',
    });
  }
}
