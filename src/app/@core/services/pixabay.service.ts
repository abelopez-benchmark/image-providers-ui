import { Injectable } from '@angular/core';
import { IImageProvider } from '../interfaces/image-provider';
import { Image } from '../models/image';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PixabayService implements IImageProvider {

  private baseUrl: string = environment.imageProviders.pixabay.apiUrl;
  private apiKey: string = environment.imageProviders.pixabay.apiKey;

  constructor(private _http: HttpClient) { }

  async searchImagesByKeywords(search: string): Promise<Image[]> {
    const url = `${this.baseUrl}`;
    const params = new HttpParams()
      .append('key', this.apiKey)
      .append('per_page', 20)
      .append('q', search);

    const response = await firstValueFrom(this._http.get<any>(url, {
      params
    }));

    const hits = response.hits;

    return hits.map((hit: any) => {
      return {
        sourceUrl: hit.webformatURL
      };
    });
  }
}
