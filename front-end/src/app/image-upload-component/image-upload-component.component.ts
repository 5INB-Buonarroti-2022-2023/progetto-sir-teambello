
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload-component.component.html',
  styleUrls: ['./image-upload-component.component.scss']
})
export class ImageUploadComponent {
  imageResponses: { image: string, message: string }[] = [];

  constructor(private http: HttpClient) { }

  onSubmit(event: any): void {
    event.preventDefault();

    const formData = new FormData();
    const fileList = event.target.images.files;

    for (let i = 0; i < fileList.length; i++) {
      formData.append('images', fileList[i]);
    }

    this.http.post<any>('http://172.16.0.242:3000/api/process', formData)
    .subscribe(response => {
      console.log(response);
      this.imageResponses = response.map((item: any) => (
        
        {
        image: `data:image/jpeg;base64,${item.base64Image}`,
        message: item.message
        })
        )
      }
      );
    }
  
}
