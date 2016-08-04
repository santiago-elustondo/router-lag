import { Component, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

declare var gapi:any; // grab from global context

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  styleUrls: [ './app/app.component.css' ],
  directives: [
    ROUTER_DIRECTIVES
  ],
  viewProviders: [],
  providers: []
})
export class AppComponent {

  constructor( private router: Router ) {

    let x = new BehaviorSubject<boolean>(false);

    gapi.load('client:auth2', () => {
      setTimeout(() => x.next(true), 3000);
    });

    x.subscribe((ready:boolean) => {
      if(ready){
          this.router.navigate(['/dogs']);   
      }
    });

  } 

}
