import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

//models
import { AuthState } from '../../models/auth-state/auth-state';

//services
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    switch(this.authService.state.getValue()){
      case AuthState.Waiting: 
        this.authService.setRedirectUrl(state.url);
        this.router.navigate(['/loading']); return false; 
      case AuthState.LoggedIn: return true;
      case AuthState.Error:
        console.log('Auth error!');
      case AuthState.NotLoggedIn: 
        this.authService.setRedirectUrl(state.url);
        this.router.navigate(['/login']); return false; 
    }   
  }
}