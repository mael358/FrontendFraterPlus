import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Registrar el locale 'es'
registerLocaleData(localeEs, 'es');

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    ...(appConfig.providers || []), provideAnimationsAsync('noop')
  ]
}).catch((err) => console.error(err));