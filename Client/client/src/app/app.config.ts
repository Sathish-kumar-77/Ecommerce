import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';
import { InitService } from './core/service/init.service';
import { lastValueFrom } from 'rxjs';

function initializeApp(InitService: InitService) {
  return () =>
    lastValueFrom(InitService.init()).finally(() => {
      // Check if we are in the browser environment before accessing the DOM
      if (typeof document !== 'undefined') {
        const splash = document.getElementById('initial-splash');
        if (splash) {
          splash.remove();
        }
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideAnimationsAsync()
    ,provideHttpClient(withInterceptors([errorInterceptor,loadingInterceptor])),
    {
      provide : APP_INITIALIZER,
      useFactory:initializeApp,
      multi: true,
      deps:[InitService]
    }
  ]
};
