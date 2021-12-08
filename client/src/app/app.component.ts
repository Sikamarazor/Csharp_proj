import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  users: any;

  constructor(private accountService: AccountService) {

  }

  setCurrentUser() {

    let getUser: any = localStorage.getItem('user');
    const user: User = JSON.parse(getUser);

    this.accountService.setCurrentUser(user);
  }

  ngOnInit() {
    this.setCurrentUser();
  }

}
