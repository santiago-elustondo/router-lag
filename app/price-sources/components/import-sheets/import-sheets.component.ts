import { Component, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { Modal } from 'angular2-modal/plugins/bootstrap/index';

//components
import { ImportSheetsDialogComponent, ImportSheetsData } from '../../index';

@Component({
  selector: 'blsp-import-sheets',
  templateUrl: './app/price-sources/components/import-sheets/import-sheets.component.html',
  styleUrls: [ './app/price-sources/components/import-sheets/import-sheets.component.css' ],
  directives: [],
  pipes: []
})
export class ImportSheetsComponent implements OnInit {

  constructor(
    private modal: Modal
  ){}

  public ngOnInit(){}

  public open(): void {
    this.modal
      .open(ImportSheetsDialogComponent, 
        new ImportSheetsData());
  }

}