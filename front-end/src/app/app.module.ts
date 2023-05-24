import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploaderComponent } from './uploader/uploader/uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //NgxDropzoneModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

