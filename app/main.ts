import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthMethods, AuthProviders } from 'angularfire2';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { MdIconRegistry } from '@angular2-material/icon';

//blsp
import { GoogleApiService, FirebaseService } from './ambient/index';
import { appRouterProviders } from './app.routes';
import { AppComponent } from './app.component';
import { AuthService } from './auth/index';

bootstrap(AppComponent, [

  //angular
  HTTP_PROVIDERS,

  //window
  provide(Window, {useValue: window}),

  //new forms
  disableDeprecatedForms(),
  provideForms(),

  //firebase
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyBpKoCI9mZbRjlX0b52pxOm4FDWFQMKgEc",
    authDomain: "build-specifier-de179.firebaseapp.com",
    databaseURL: "https://build-specifier-de179.firebaseio.com",
    storageBucket: "build-specifier-de179.appspot.com"
  }),

  //material
  MdIconRegistry,

  AuthService,
  GoogleApiService, 
  FirebaseService,
  appRouterProviders
  
]);