import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//components
import { LoginButtonComponent } from '../../../auth/index';

//material
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

@Component({
  selector: 'blsp-layout-header',
  templateUrl: './app/layout/components/header/header.component.html',
  styleUrls: [ './app/layout/components/header/header.component.css' ],
  directives: [ 
    MD_TOOLBAR_DIRECTIVES, 
    MD_BUTTON_DIRECTIVES, 
    MD_ICON_DIRECTIVES,
    LoginButtonComponent
  ],
  pipes: []
})
export class HeaderComponent implements OnInit {

  @Output('leftMenuClick') leftMenuClick = new EventEmitter();

  constructor(){}

  ngOnInit(){}

}