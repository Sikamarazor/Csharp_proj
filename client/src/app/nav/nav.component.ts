import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AccountService) { 
  }

  login() {
    console.log("Login ", this.model);

    this.accountService.login(this.model).subscribe(data => {
      console.log('Res ', data);

    }, error => {
      console.log('Error found ', error);
    });
  }

  logout() {

    this.accountService.logout();
  }

  ngOnInit(): void {

  }

}
