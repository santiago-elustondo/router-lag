import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blsp-wakeup-hack',
  template: `
    <span *ngIf="x" style="display:none" hidden></span>
  `
})
export class WakeUpHackComponent implements OnInit {

  private x:boolean = false;

  constructor(){ 
    setInterval(() => {
      this.x = !this.x;
    },300);
  }

  public ngOnInit(){
   
  }
}