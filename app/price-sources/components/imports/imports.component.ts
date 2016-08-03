import { Component, OnInit } from '@angular/core';

//components
import { ListImportsComponent } from '../list-imports/list-imports.component';
import { ImportSheetsComponent } from '../import-sheets/import-sheets.component';

@Component({
  selector: 'blsp-imports',
  templateUrl: './app/price-sources/components/imports/imports.component.html',
  styleUrls: [ './app/price-sources/components/imports/imports.component.css' ],
  directives: [ ListImportsComponent, ImportSheetsComponent ],
  pipes: []
})
export class ImportsComponent implements OnInit {

  constructor(){}

  ngOnInit(){}

}