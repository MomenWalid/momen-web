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
  templateUrl: './contact-form.component.html',
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
export class ContactFormComponent {
  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

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

  tagOptions = [
    { label: 'Prospect', value: 'prospect' },
    { label: 'Customer', value: 'customer' },
    { label: 'Lead', value: 'lead' },
    { label: 'Partner', value: 'partner' },
  ];

  save() {
    const channel = new BroadcastChannel('contacts');
    channel.postMessage({ type: 'add', contact: this.contact });

    console.log('Contact saved:', this.contact);
    // localStorage.setItem('newContact', JSON.stringify(this.contact));

    // this.contactsService.addContact$.next(this.contact);

    // you can push it to your service or navigate back to list
  }
}
