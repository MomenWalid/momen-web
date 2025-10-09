import { Component } from '@angular/core';
import { QuranDataService } from '../../core/services/quran.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-surah-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './surah-list.component.html',
  styleUrl: './surah-list.component.css',
})
export class SurahListComponent {
  surahs: any;

  constructor(private readonly quranDataService: QuranDataService) {}

  ngOnInit() {
    this.getSurahs();
    this.quranDataService.getAudios().subscribe((res) => {
      console.log(res);
    });

    this.quranDataService.reciters().subscribe((res) => {
      console.log('reciters', res);
    });

    this.quranDataService.suwar().subscribe((res) => {
      console.log('suwar', res);
    });
  }

  getSurahs() {
    this.quranDataService.getSurahs().subscribe((res) => {
      console.log(res);
      this.surahs = res;
    });
  }
}
