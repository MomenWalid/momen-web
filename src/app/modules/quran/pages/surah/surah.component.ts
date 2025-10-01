import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuranDataService } from '../../core/services/quran.service';

@Component({
  selector: 'app-surah',
  standalone: true,
  imports: [],
  templateUrl: './surah.component.html',
  styleUrl: './surah.component.css',
})
export class SurahComponent {
  surah: any;
  surahId: any;
  constructor(
    private readonly quranDataService: QuranDataService,
    private readonly route: ActivatedRoute
  ) {
    this.route.params.subscribe((param: any) => {
      console.log(param);
      this.surahId = param.id;
    });
  }

  ngOnInit() {
    this.getSurah(this.surahId);
  }

  getSurah(id: number) {
    this.quranDataService.getSurah(id).subscribe((res) => {
      console.log(res);
      this.surah = res;
    });
  }
}
