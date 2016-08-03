import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//components
import { CatComponent } from './cat.component';

//material
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
  selector: 'blsp-cats',
  template: `
    <div>
      <md-icon>tag faces</md-icon>
    </div>

    <div>
      cats component {{ initMessage }}
    </div>

    <div>
      <blsp-cat></blsp-cat>
    </div>
  `,
  directives: [CatComponent, MD_ICON_DIRECTIVES]
})
export class CatsComponent implements OnInit {

  initMessage:string;

  constructor(){
    this.initMessage = 'constructed';
  }

  ngOnInit(){
    this.initMessage = 'ready';
  }

}