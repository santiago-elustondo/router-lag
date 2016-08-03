import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router} from '@angular/router';

//models
import { AuthState } from '../../models/auth-state/auth-state';

//services
import { GoogleApiService } from '../../../ambient/index';
import { FirebaseService } from '../../../ambient/index';

@Injectable()
export class AuthService {

  public state: BehaviorSubject<AuthState>;
  public user:any; //<User> TODO: (make this model)

  private _redirectUrl:string; // has setter
  private _gapiAuth:any;
  private _gUser:any;

  private HOME_PAGE:string = '/dogs';
  private LOGIN_PAGE:string = '/login';

  constructor(
    private gapiService: GoogleApiService,
    private firebaseService: FirebaseService,
    private router: Router
  ){ 
    this.state = new BehaviorSubject(AuthState.Waiting); 
    this.init();
  }

  public signIn():void { this._gapiAuth.signIn(); }

  public signOut():void { this._gapiAuth.signOut(); }

  public setRedirectUrl(url:string):void { this._redirectUrl = url;}

  private init():void {
    this.gapiService.ready.subscribe((ready:boolean) => {
      if(ready){
        this.gapiService.initAuth().then(() => {
          this._gapiAuth = this.gapiService.gapi.auth2.getAuthInstance();
          this._gapiAuth.isSignedIn.listen((isSignedIn:boolean) => {
            this.gapiChange(isSignedIn);
          });
          this.gapiChange(this._gapiAuth.isSignedIn.get());
        });
      }
    });
  }

  private loggedIn(){
    this.state.next(AuthState.LoggedIn);
    this.router.navigate([(this._redirectUrl || this.HOME_PAGE)]);   
  }

  private loggedOut(){
    this.state.next(AuthState.NotLoggedIn);
    this.router.navigate([(this.LOGIN_PAGE)]);   
  }

  private gapiChange(isSignedIn:boolean):void {
    if(!isSignedIn) { this._gUser = null; }
    else {
      try { this._gUser = this._gapiAuth.currentUser.get(); } 
      catch(e) {
        console.log(e); 
        this.state.next(AuthState.Error);
      }
    }
    this.updateFirebaseAuth();
  }
   
  private updateFirebaseAuth():void {
    if(this._gUser){
      var u = this.firebaseService.firebase.auth().onAuthStateChanged((fUser:any) => {
        u();
        if(!this.isUserEqual(this._gUser, fUser)){
          var credential = this.firebaseService.firebase.auth
            .GoogleAuthProvider.credential(this._gUser.getAuthResponse().id_token);
          this.firebaseService.firebase.auth().signInWithCredential(credential)
          .then((x:any) => this.loggedIn())
          .catch((error:any) => this.state.next(AuthState.Error));
        } else { this.loggedIn(); }
      });
    } else {
      this.firebaseService.firebase.auth().signOut().then(
        (x:any) => this.loggedOut(), 
        (error:any) => this.state.next(AuthState.Error)
      );
    }
  }
  
  private isUserEqual(googleUser:any, firebaseUser:any):boolean {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          return true;
        }
      }
    }
    return false;
  }


}
