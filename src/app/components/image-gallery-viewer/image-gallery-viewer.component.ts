import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { IImageProvider } from '../../@core/interfaces/image-provider';
import { Image } from '../../@core/models/image';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-gallery-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery-viewer.component.html',
  styleUrl: './image-gallery-viewer.component.scss'
})
export class ImageGalleryViewerComponent implements OnInit, OnDestroy {

  @Input() provider: IImageProvider | null = null;
  @Input() search: string = '';

  @Input() onSearch: EventEmitter<void> = new EventEmitter();

  images: Image[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.populateImages();
    if (this.onSearch) {
      this.onSearch.subscribe(() => {
        this.populateImages();
      })
    }
  }

  ngOnDestroy(): void {
    if (this.onSearch) {
      this.onSearch.unsubscribe();
    }
  }

  async populateImages() {
    if (this.provider) {
      this.provider.searchImagesByKeywords(this.search)
        .then((images) => {
          this.images = images;
        })
        .catch((err) => console.error);
    }
  }
}
