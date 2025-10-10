import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
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
export class AddContactDialogComponent {
  constructor(private ref: DynamicDialogRef) {}

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

    this.ref.close();
  }
}
