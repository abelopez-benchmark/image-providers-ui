import { Injectable } from '@angular/core';
import { IImageProvider } from '../interfaces/image-provider';
import { Image } from '../models/image';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PexelsService implements IImageProvider {

  private baseUrl: string = environment.imageProviders.pexels.apiUrl;
  private apiKey: string = environment.imageProviders.pexels.apiKey;

  constructor(private _http: HttpClient) { }

  async searchImagesByKeywords(search: string): Promise<Image[]> {
    const url = `${this.baseUrl}/search`;
    const headers = new HttpHeaders()
      .append('Authorization', this.apiKey);
    const params = new HttpParams()
      .append('per_page', 20)
      .append('query', search);

    const response = await firstValueFrom(this._http.get<any>(url, {
      headers,
      params
    }));

    const photos = response.photos;

    return photos.map((photo: any) => {
      return {
        sourceUrl: photo.src.medium
      };
    });
  }
}
