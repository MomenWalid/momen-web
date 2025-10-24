import { Routes } from '@angular/router';
import { SurahListComponent } from './modules/quran/pages/surah-list/surah-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'surah-list',
    component: SurahListComponent,
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
];
