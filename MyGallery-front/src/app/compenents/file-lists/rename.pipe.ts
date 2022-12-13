




import { PipeTransform, Pipe } from '@angular/core';


@Pipe({ name: 'rename' })
export class RenamePipe implements PipeTransform {


  color = {
    'green':{
      color:'#2da9e9',
      icon: 'fa fa-file-excel-o text-success'
    },
   dark: {
      color:'#0ec8a2',
      
    },
    blue:{
      color:'#0ec8a2',
      icon:'fa-file-excel-o'
    },
      
   
   }
  transform(typeString: string): string {


    if (typeString === 'text/csv') {
      return 'fa fa-file-excel-o text-success';

      
    } 
    
    
    else if (typeString === 'image/png' || typeString === 'image/jpeg' ) {
      return 'fa fa-light fa-image text-primary';
    } 

    

    else if (typeString === 'video/mp4') {
      return 'fa fa-file-video-o text-dark';
    }
    
    
    
    else if (typeString === 'application/pdf') {
      return 'fa fa-file-pdf-o text-danger';
    }
    
    else if (typeString === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        return 'fa fa-file-powerpoint-o text-warning';



    } else if (typeString === 'text/plain') {
      return 'fa fa-file-text-o text-dark';


    }
    else {
       return typeString
    }
  }
}