import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
	
@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})

export class UploaderComponent {
	/*selectedFiles!: File[];
  
	constructor(private http: HttpClient) { }
  
	uploadImages(): void {
	  const formData = new FormData();
  
	  if (this.selectedFiles && this.selectedFiles.length > 0) {
		for (let i = 0; i < this.selectedFiles.length; i++) {
		  formData.append('images', this.selectedFiles[i]);
		}
	  }
  
	  this.http.post('http://127.0.0.1:3000/api/process', formData)
		.subscribe(
		  response => {
			console.log('Upload successful!', response);
			// Handle the response from the server
		  },
		  error => {
			console.error('Error occurred during upload!', error);
			// Handle any error that occurred during the upload
		  }
		);
	}*/
  }