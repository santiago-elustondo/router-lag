import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
declare var gapi:any; // grab from global context

@Injectable()
export class GoogleApiService {

  private API_KEY: string = 'AIzaSyBpKoCI9mZbRjlX0b52pxOm4FDWFQMKgEc';
  private CLIENT_ID: string = '1044999030144-jqhecs41gj35vi297a5vc7936f6po3tp.apps.googleusercontent.com';
  private SCOPES: string = 'profile https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.readonly';

  public waiting: BehaviorSubject<boolean>;
  public isSignedIn: BehaviorSubject<boolean>;
  public auth2: any; // AuthInstance
  public gapi: any; // GoogleApiClient

  /* temp */
  public u:any;

  constructor() {
      if(!gapi) {
        throw new Error('google api client not found');
      } else {
      //grab from glob
      this.gapi = gapi;
      this.waiting = new BehaviorSubject<boolean>(true);
      this.gapi.load('client:auth2', () => {
        this.loadApis()
        .then(() => {
          this.initAuth(); 
        });
      });
    }
  }

  public signIn(){ this.auth2.signIn(); }

  public signOut(){ this.auth2.signOut(); }

  private initAuth(){
    this.gapi.client.setApiKey(this.API_KEY);
    this.gapi.auth2.init({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES
    }).then(() => {
      this.auth2 = this.gapi.auth2.getAuthInstance();
      this.auth2.isSignedIn.listen((yesno:boolean) => {
        this.isSignedIn.next(yesno);
      });
      this.isSignedIn = new BehaviorSubject<boolean>(this.auth2.isSignedIn.get());
      this.waiting.next(false);
    });
  }

  private loadApis(){
    let promises: Array<Promise<any>> = []; 
    promises = [
      gapi.client.load('people', 'v1'),
      gapi.client.load('drive', 'v3'),
      gapi.client.load('sheets', 'v4')
    ];
    return Promise.all(promises);
  }

}