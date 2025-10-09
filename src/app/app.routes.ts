import { Routes } from '@angular/router';
import { ContactFormComponent } from './modules/contacts/contact-form/contact-form.component';
import { ContactsListComponent } from './modules/contacts/contact-list/contacts-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'surah-list',
    pathMatch: 'full',
  },

  {
    path: 'surah-list',
    loadComponent: () =>
      import('./modules/quran/pages/surah-list/surah-list.component').then(
        (m) => m.SurahListComponent
      ),
  },
  {
    path: 'surah/:id',
    loadComponent: () =>
      import('./modules/quran/pages/surah/surah.component').then(
        (m) => m.SurahComponent
      ),
  },

  { path: 'contacts', component: ContactsListComponent },
  { path: 'contacts/add', component: ContactFormComponent },
];
