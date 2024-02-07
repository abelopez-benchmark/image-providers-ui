import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PexelsService } from './@core/services/pexels.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(CommonModule), importProvidersFrom(HttpClientModule), PexelsService]
};
