import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private accountService: AccountService) { }

  register() {
    this.accountService.register(this.model).subscribe(response => {
      console.log('Registerd ', response);
      this.cancel();
    })
  }

  cancel() {
    console.log('Cancelled ');

    this.cancelRegister.emit(false);
  }

  ngOnInit(): void {

  }

}
