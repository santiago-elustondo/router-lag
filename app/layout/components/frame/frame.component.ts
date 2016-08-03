import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

//components
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../sidenav/sidenav.component';

//material
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';

@Component({
  selector: 'blsp-layout-frame',
  templateUrl: './app/layout/components/frame/frame.component.html',
  styleUrls: [ './app/layout/components/frame/frame.component.css' ],
  directives: [ 
    HeaderComponent,
    SideNavComponent,
    ROUTER_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES
  ],
  pipes: []
})
export class FrameComponent implements OnInit {

  constructor(){}

  ngOnInit(){}

}