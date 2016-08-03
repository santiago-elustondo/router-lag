import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

//material
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

@Component({
  selector: 'blsp-sidenav',
  templateUrl: './app/layout/components/sidenav/sidenav.component.html',
  styleUrls: [ './app/layout/components/sidenav/sidenav.component.css' ],
  directives: [ 
    ROUTER_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_LIST_DIRECTIVES
  ],
  pipes: []
})
export class SideNavComponent implements OnInit {

  @Output() linkClick = new EventEmitter();

  constructor(){}

  ngOnInit(){}

  clickLink(event: Event){
    event.stopPropagation();
    this.linkClick.emit(true);
  }

}