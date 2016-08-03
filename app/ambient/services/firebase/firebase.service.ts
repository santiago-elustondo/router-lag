import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

declare var firebase:any; // grab from global context

@Injectable()
export class FirebaseService {

  public firebase: any; //FirebaseClient

  constructor(
    private af: AngularFire //need to require in order to initialize firebase global
  ){
    if(!firebase) {
      throw new Error('firebase client not found');
    } else {
      this.firebase = firebase;
    }
  }

}
