import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//components
import { DogComponent } from './dog.component';

//material
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
  selector: 'blsp-dogs',
  template: `
    <div>
      <md-icon>tag faces</md-icon>
    </div>

    <div>
      literal text
    </div>

    <div>
      dogs component {{ initMessage }}
    </div>

    <div>
      <blsp-dog></blsp-dog>
    </div>

    <button (click)="click()">change num</button>
    {{num}}
  `,
  directives: [DogComponent, MD_ICON_DIRECTIVES]
})
export class DogsComponent implements OnInit {

  initMessage:string;
  num:number = 0;

  constructor(){
    this.initMessage = 'constructed';
  }

  ngOnInit(){
    this.initMessage = 'ready';
  }

  click(){
    this.num++;
  }

}