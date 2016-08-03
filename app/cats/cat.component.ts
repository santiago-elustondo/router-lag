import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'blsp-cat',
  template: `
    cat component {{ initMessage }}
  `,
})
export class CatComponent implements OnInit {

  initMessage:string;

  constructor(){
    this.initMessage = 'constructed';
  }

  ngOnInit(){
    this.initMessage = 'ready';
  }

}