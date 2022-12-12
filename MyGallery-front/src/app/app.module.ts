import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './compenents/upload-file/upload-file.component';
import { FileDetailsComponent } from './compenents/file-details/file-details.component';
import { FileListsComponent } from './compenents/file-lists/file-lists.component';
import { HttpClientModule } from '@angular/common/http';
import { FileCardComponent } from './compenents/file-card/file-card.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    FileDetailsComponent,
    FileListsComponent,
    FileCardComponent
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
