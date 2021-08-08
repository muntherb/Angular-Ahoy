import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-voice';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VoicesComponent } from './voices/voices.component';
import { VoiceSearchComponent } from './voice-search/voice-search.component';
import { MessagesComponent } from './messages/messages.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { LoaderInterceptor } from './loader.interceptor';
// import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    VoicesComponent,
    MessagesComponent,
    VoiceSearchComponent,
    LoaderComponent
  ],
  providers: [LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


