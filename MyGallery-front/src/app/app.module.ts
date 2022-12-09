import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './compenents/upload-file/upload-file.component';
import { FileDetailsComponent } from './compenents/file-details/file-details.component';
import { FileListsComponent } from './compenents/file-lists/file-lists.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    FileDetailsComponent,
    FileListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]

  
})
export class AppModule { }
