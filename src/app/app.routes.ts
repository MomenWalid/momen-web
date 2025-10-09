import { Routes } from '@angular/router';

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
];
