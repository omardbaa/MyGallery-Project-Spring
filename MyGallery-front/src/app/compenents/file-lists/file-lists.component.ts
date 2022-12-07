import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-lists',
  templateUrl: './file-lists.component.html',
  styleUrls: ['./file-lists.component.css']
})
export class FileListsComponent implements OnInit {

  fileInfos?: Observable<any>


  constructor(private fileSrvice: FileService, 
    private router: Router) { }


  ngOnInit(): void {
    this.fileInfos = this.fileSrvice.getFiles();
  }

}
