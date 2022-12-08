import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FileModule } from 'src/app/modules/file/file.module';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-lists',
  templateUrl: './file-lists.component.html',
  styleUrls: ['./file-lists.component.css']
})
export class FileListsComponent implements OnInit {

  id = '';


  files!: Observable <FileModule[]> ;


  constructor(private fileSrvice: FileService,
    private router: Router) { }


  ngOnInit(): void {
   // this.getFiles();
   this.files = this.fileSrvice.getFiles();
  }



 /* private getFiles(){
    this.fileSrvice.getFiles().subscribe(data =>{
      this.files = data;
    });
  }*/
  deleteFile (id: string){
    this.fileSrvice.deleteFile(id).subscribe(data =>{
   console.log(data);
      this.fileSrvice.getFiles();
    })
  }

}
