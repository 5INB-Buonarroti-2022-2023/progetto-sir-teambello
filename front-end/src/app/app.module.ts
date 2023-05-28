import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploaderComponent } from './uploader/uploader.component';
import { ImageUploadComponent } from './image-upload-component/image-upload-component.component';
import { ViewAllComponent } from './view-all/view-all.component';

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    ImageUploadComponent,
    ViewAllComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //NgxDropzoneModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

