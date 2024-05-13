import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { environment } from '../environments';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    PagesModule,
    NgxGoogleAnalyticsModule.forRoot(environment.googleTrackingCode),
    AuthModule.forRoot({
      domain: 'turnik-city.us.auth0.com',
      clientId: 'tR8Q2G08KW4W2hT3pPWrk56C2GDJiXoq',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://turnik-city.us.auth0.com/api/v2/',
        scope: 'openid profile email read:current_user update:current_user_metadata',
      },
    }),
    AppRouting,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
