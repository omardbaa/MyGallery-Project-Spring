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


}
