import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AccountService, private router: Router, private toast: ToastrService) { 
  }

  login(): void {
    console.log("Login ", this.model);

    this.accountService.login(this.model).subscribe(data => {
      console.log('Res ', data);

      this.router.navigateByUrl('/members');

    }, error => {
      console.log('Error found ', error);
      this.toast.error(error.error);
    });
  }

  logout() {

    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {

  }

}
