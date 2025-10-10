import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contact.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-edit-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
  ],
})
export class ContactEditFormComponent {
  contact = {
    name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
    city: '',
    country: '',
    tags: '',
    created_at: new Date(),
  };

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {
    const state = window.history.state;
    console.log(window.history);
    console.log(window.history.state);
    console.log(state);
    this.contact = state;
  }

  tagOptions = [
    { label: 'Prospect', value: 'prospect' },
    { label: 'Customer', value: 'customer' },
    { label: 'Lead', value: 'lead' },
    { label: 'Partner', value: 'partner' },
  ];

  save() {
    const channel = new BroadcastChannel('contacts');
    channel.postMessage({ type: 'edit', contact: this.contact });

    console.log('Contact saved:', this.contact);
  }
  delete() {
    const channel = new BroadcastChannel('contacts');
    channel.postMessage({ type: 'delete', contact: this.contact });

    console.log('Contact deleted:', this.contact);
  }
}
