import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  addContact$ = new Subject<any>();
  constructor() {
    this.addContact$.subscribe((val) => console.log('Service got:', val));
  }
}
