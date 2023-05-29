import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent {
  imageResponses: { image: string, message: string }[] = [];

  constructor(private http: HttpClient){}
  
  onSubmit(event: any): void {
	  event.preventDefault();

    this.http.get<any>('http://172.16.0.242:3000/server/images/service/tmp')
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
