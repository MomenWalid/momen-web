import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contact.service';
import { FormsModule } from '@angular/forms';

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
  imports: [FormsModule],
})
export class ContactFormComponent {
  contact = { name: '', email: '', phone: '' };

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  save() {
    if (this.contact.name && this.contact.email && this.contact.phone) {
      this.contactsService.addContact({ ...this.contact, id: 0 });
      this.router.navigate(['/']);
    }
  }
}
