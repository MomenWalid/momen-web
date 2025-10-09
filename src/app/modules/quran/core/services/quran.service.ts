import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuranDataService {
  protected environment = environment;
  private baseUrl = environment.quranUrl;

  constructor(private http: HttpClient) {}

  // Load surah metadata
  getSurahs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/surahs.json`);
  }

  // Load ayahs of a specific surah
  getSurah(number: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/surahs/${number}.json`);
  }

  getAudios() {
    return this.http.get('https://mp3quran.net/api/v3/languages');
  }
  radios() {
    return this.http.get('https://www.mp3quran.net/api/v3/radios?language=ar');
  }
  reciters() {
    return this.http.get(
      'https://www.mp3quran.net/api/v3/reciters?language=ar'
    );
  }
  rewayah() {
    return this.http.get('https://www.mp3quran.net/api/v3/riwayat?language=ar');
  }
  suwar() {
    return this.http.get('https://www.mp3quran.net/api/v3/suwar?language=ar');
  }
  ss() {
    return this.http.get('https://server13.mp3quran.net/husr/001.mp3', {
      responseType: 'arraybuffer',
    });
  }
}
