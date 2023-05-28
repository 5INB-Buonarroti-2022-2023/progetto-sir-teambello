import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface ImageData {
  base64Image: string;
  message: string;
}
@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})

export class ResponseComponent implements OnInit{
  imageData: ImageData[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.http.get<ImageData[]>('http://localhost:3000/api/process')
      .subscribe((data) => {
        this.imageData = data;
      });
  }
}
