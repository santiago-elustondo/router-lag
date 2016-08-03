import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

declare var gapi:any; // grab from global context

@Injectable()
export class GoogleApiService {
  
  private API_KEY: string = 'AIzaSyBpKoCI9mZbRjlX0b52pxOm4FDWFQMKgEc';
  private CLIENT_ID: string = '1044999030144-jqhecs41gj35vi297a5vc7936f6po3tp.apps.googleusercontent.com';
  private SCOPES: string = 'profile https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.readonly';

  public ready: BehaviorSubject<boolean>;
  public auth2: any; // AuthInstance
  public gapi: any; // GoogleApiClient

  constructor() {
    if(!gapi) {
      throw new Error('google api client not found');
    } else {
      this.gapi = gapi;
      this.ready = new BehaviorSubject<boolean>(false);
      this.gapi.load('client:auth2', () => {
        this.loadApis()
        .then(() => this.ready.next(true)); 
      });
    }
  }

  public initAuth(): Promise<any>{
    this.gapi.client.setApiKey(this.API_KEY);
    return this.gapi.auth2.init({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES
    })
  }

  private loadApis(): Promise<any>{
    let promises: Array<Promise<any>> = []; 
    promises = [
      gapi.client.load('people', 'v1'),
      gapi.client.load('drive', 'v3'),
      gapi.client.load('sheets', 'v4')
    ];
    return Promise.all(promises);
  }

}