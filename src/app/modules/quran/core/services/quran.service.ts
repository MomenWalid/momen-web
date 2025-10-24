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
}
