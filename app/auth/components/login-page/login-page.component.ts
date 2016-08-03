import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//components
import { LoginButtonComponent } from '../login-button/login-button.component';

@Component({
  selector: 'blsp-auth-test',
  template: `

    <blsp-login-button></blsp-login-button>
  `,
  directives: [ LoginButtonComponent ],
  pipes: []
})
export class LoginPageComponent implements OnInit {
  constructor(){}
  ngOnInit(){}
}