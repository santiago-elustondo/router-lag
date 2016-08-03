import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

//services
import { AuthService } from '../../services/auth/auth.service';
import { AuthState } from '../../models/auth-state/auth-state';


@Component({
  selector: 'blsp-login-button',
  templateUrl: './app/auth/components/login-button/login-button.component.html',
  styleUrls: [ './app/auth/components/login-button/login-button.component.css' ],
  directives: [],
  pipes: []
})
export class LoginButtonComponent implements OnInit {

  public signedIn: boolean = false;

  constructor(
    private authService: AuthService
  ){}

  public ngOnInit(){
    this.authService.state.subscribe((state:AuthState) => {
      this.signedIn = (state === AuthState.LoggedIn)? true : false;
    });
  }

  private authorizeClick(){ this.authService.signIn(); }

  private unAuthorizeClick(){ this.authService.signOut(); }

}