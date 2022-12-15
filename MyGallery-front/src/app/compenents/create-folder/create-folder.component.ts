import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FolderModule } from 'src/app/modules/folder/folder.module';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent {

  folderId!:number;
  folders: FolderModule[] = [];

  folder: FolderModule = new FolderModule();
  constructor(private folderService: FolderService, 
    private router: Router) { }

  ngOnInit(): void {
    this.getFolders();
  }

  saveFolder(){
this.folderService.createFolder(this.folder).subscribe(data => {
  console.log(data);
 ;

},
  error => console.log(error));
}
private getFolders() {
  this.folderService.getFolderList().subscribe(data => {
    this.folders = data;
    console.log("data ", this.folders)
  });
}

folderDetails(folderId:number){
  this.router.navigate(['/folder-details', folderId]);

}


  onSubmit(){
    console.log(this.folder);
    this.saveFolder()
    this.getFolders();

  }

}
