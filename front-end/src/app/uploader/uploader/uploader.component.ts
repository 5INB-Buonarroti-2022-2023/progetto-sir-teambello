import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
	
@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
	private selectedFiles!: File[];

	constructor(private http: HttpClient) { }
  
	onFilesSelected(event: { target: { files: File[]; }; }): void {
	  this.selectedFiles = event.target.files;
	}
  
	onUpload(): void {
	  const formData = new FormData();
	  for (let i = 0; i < this.selectedFiles.length; i++) {
		formData.append('images', this.selectedFiles[i]);
	  }
  
	  this.http.post('http://localhost:3000/images/service/tmp', formData)
		.subscribe(response => {
		  console.log(response);
		  // Esegui le operazioni desiderate dopo il caricamento delle immagini
		}, error => {
		  console.error(error);
		});
	}	
}
