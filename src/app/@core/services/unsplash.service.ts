import { Injectable } from '@angular/core';
import { IImageProvider } from '../interfaces/image-provider';
import { Image } from '../models/image';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService implements IImageProvider {

  private baseUrl: string = environment.imageProviders.unsplash.apiUrl;
  private apiKey: string = environment.imageProviders.unsplash.apiKey;

  constructor(private _http: HttpClient) { }

  async searchImagesByKeywords(search: string): Promise<Image[]> {
    const url = `${this.baseUrl}/search/photos`;
    const headers = new HttpHeaders()
      .append('Authorization', `Client-ID ${this.apiKey}`)
      .append('Accept-Version', 'v1');
    const params = new HttpParams()
      .append('query', search);

    const response = await firstValueFrom(this._http.get<any>(url, {
      headers,
      params
    }));

    const results = response.results;

    return results.map((result: any) => {
      return {
        sourceUrl: result.urls.regular
      };
    });
  }
}
