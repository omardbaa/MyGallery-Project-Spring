import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RenamePipe } from './compenents/file-lists/rename.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './compenents/upload-file/upload-file.component';
import { FileDetailsComponent } from './compenents/file-details/file-details.component';
import { FileListsComponent } from './compenents/file-lists/file-lists.component';
import { HttpClientModule } from '@angular/common/http';
import { FileCardComponent } from './compenents/file-card/file-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CreateFolderComponent } from './compenents/create-folder/create-folder.component';
import { UpdateFolderComponent } from './compenents/update-folder/update-folder.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    FileDetailsComponent,
    FileListsComponent,
    FileCardComponent,
    RenamePipe,
    CreateFolderComponent,
    UpdateFolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule, 
    NgxPaginationModule, 
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]


})
export class AppModule { }
