import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { IImageProvider } from './@core/interfaces/image-provider';
import { PexelsService } from './@core/services/pexels.service';
import { ImageGalleryViewerComponent } from './components/image-gallery-viewer/image-gallery-viewer.component';
import { UnsplashService } from './@core/services/unsplash.service';
import { PixabayService } from './@core/services/pixabay.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgbNavModule, ImageGalleryViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Image Providers';
  active = 1;
  search = 'computer'
  providers: IImageProvider[] = [];

  constructor(unsplashService: UnsplashService, pexelsService: PexelsService, pixabayService: PixabayService) {
    this.providers[1] = unsplashService;
    this.providers[2] = pexelsService;
    this.providers[3] = pixabayService;
  }
}
