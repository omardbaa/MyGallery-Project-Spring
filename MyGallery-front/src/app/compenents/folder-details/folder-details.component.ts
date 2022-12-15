import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileModule } from 'src/app/modules/file/file.module';
import { FolderModule } from 'src/app/modules/folder/folder.module';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.css']
})
export class FolderDetailsComponent {




  allFiles: FileModule[] = [];

  folderId!: number;
  folder: FolderModule = new FolderModule;
  
  file: FileModule= new FileModule;
  
  id!:number;
  
  
  
    constructor(private folderService: FolderService , private route: ActivatedRoute) { }
  
    
  
    ngOnInit(): void {
      this.folderId = this.route.snapshot.params['id'];
      this.folder = new FolderModule();
      this.folderService.getFolderById(this.folderId).subscribe(data => {
        this.folder = data;
  
        this.getFiles();
      });
  
  
  
    }
  
  
    private getFiles(){
      this.folderService.getAllFiles(this.folderId).subscribe(data =>{
     let files= [];
     let datalist:any = data;
        for (let a of datalist) {
          if (a.id) {
            files.push(a)
  
          }
        }
        this.allFiles = files;
      });
    }
    
  
  }
  