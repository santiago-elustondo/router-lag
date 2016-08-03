import { Component, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


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

  constructor(){} 

}