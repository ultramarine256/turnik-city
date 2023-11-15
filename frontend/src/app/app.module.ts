import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments';
import { InterceptorsModule } from './modules';
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
      domain: 'dev-1y2sdjiu.us.auth0.com',
      clientId: 'gLrsIBP3DXUuImwBoEXYAQCoxv96E4G4',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-1y2sdjiu.us.auth0.com/api/v2/',
        scope: 'openid profile email read:current_user update:current_user_metadata',
      },
    }),
    AppRouting,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
