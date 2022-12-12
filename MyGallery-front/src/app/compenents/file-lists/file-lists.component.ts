import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FILE_TYPES } from 'src/app/Constants';

import { FileModule } from 'src/app/modules/file/file.module';
import { FileService } from 'src/app/services/file.service';

import { FileCardComponent } from '../file-card/file-card.component';

@Component({
  selector: 'app-file-lists',
  templateUrl: './file-lists.component.html',
  styleUrls: ['./file-lists.component.css']
})


export class FileListsComponent implements OnInit {
  files: FileModule[] = [];
  id = ''
 types = {
    'text/plain':{
      color:'#0ec8a2',
      icon:'fa-file-excel-o'
    },
   png: {
      color:'#0ec8a2',
      icon:'fa-file-excel-o'
    },
    'pdf':{
      color:'#0ec8a2',
      icon:'fa-file-excel-o'
    },
      
   
   }



  file: FileModule = new FileModule();
 
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';




  constructor(private fileSrvice: FileService,
    private router: Router) { }


  ngOnInit(): void {
   this.getFiles();
  
  }



  private getFiles(){
    this.fileSrvice.getFiles().subscribe(data =>{
      this.files = data;
      console.log("data ", this.files)
    });}

  deleteFile (id: string){
    this.fileSrvice.deleteFile(id).subscribe(data =>{
   console.log(data);
      this.getFiles();
    })
  }













  
  
 



    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
    }
  
    upload(): void {
      this.progress = 0;
  
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
  
        if (file) {
          this.currentFile = file;
  
          this.fileSrvice.upload(this.currentFile).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                
              }
            },
            error: (err: any) => {
              console.log(err);
              this.progress = 0;
  
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the file!';
              }
  
              this.currentFile = undefined;
            }
          });
        }
  
        this.selectedFiles = undefined;
      }
    }


}
