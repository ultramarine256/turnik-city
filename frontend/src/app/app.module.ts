import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxGoogleAnalyticsModule.forRoot(environment.googleTrackingCode),
    AppRouting,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
