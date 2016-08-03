import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'blsp-dog',
  template: `
    dog component {{ initMessage }}
  `,
})
export class DogComponent implements OnInit {

  initMessage:string;

  constructor(){
    this.initMessage = 'constructed';
  }

  ngOnInit(){
    this.initMessage = 'ready';
  }

}