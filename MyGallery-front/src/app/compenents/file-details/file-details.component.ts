import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileModule } from 'src/app/modules/file/file.module';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css'],
})
export class FileDetailsComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private route: ActivatedRoute
  ) {}

  files: FileModule[] = [];

  id!: string;
  file: FileModule = new FileModule();

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.file = new FileModule();
    this.fileService.getFileById(this.id).subscribe((data) => {
      this.file = data;
      console.log(data);
    });
  }

  pdfSrc!: string;

  onFileSelected() {
    let $img: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }
}
