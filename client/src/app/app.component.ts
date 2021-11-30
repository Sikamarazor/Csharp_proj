import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  users: any;

  constructor(private http: HttpClient) {

  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(respose => {
      console.log('Data ', respose);
      this.users = respose;

    },error => {
      console.log('Error ', error);
    });
  }
  ngOnInit() {
    this.getUsers();
    
  }

}
