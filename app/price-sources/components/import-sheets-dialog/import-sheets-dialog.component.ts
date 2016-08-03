import { Component, ChangeDetectorRef, OnInit, Input,  ViewChild} from '@angular/core';

// modal imports
import { Modal } from 'angular2-modal/plugins/bootstrap/index';
import { ModalComponent } from 'angular2-modal/index';
import { DialogRef } from 'angular2-modal/models/dialog-ref';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';

//services
import { GoogleSheetsService } from '../../../google/index';
import { ImportsService } from '../../services/imports/imports.service';
import { SheetParserService } from '../../services/sheet-parser/sheet-parser.service';

//components
import { ListSheetsComponent } from '../list-sheets/list-sheets.component';
import { LoginButtonComponent } from '../../../auth/index';
import { WakeUpHackComponent } from '../../../utils/index';

//models
import { PriceImport } from '../../models/price-import/PriceImport.d';
import { SheetId } from '../../models/sheet-id/SheetId.d';

// modal input data 
export class ImportSheetsData extends BSModalContext {
  constructor() {
    super();
  }
}

@Component({
  selector: 'blsp-import-sheets-dialog',
  templateUrl: './app/price-sources/components/import-sheets-dialog/import-sheets-dialog.component.html',
  styleUrls: [ './app/price-sources/components/import-sheets-dialog/import-sheets-dialog.component.css' ],
  directives: [ ListSheetsComponent, LoginButtonComponent, WakeUpHackComponent ],
  pipes: []
})
export class ImportSheetsDialogComponent implements ModalComponent<ImportSheetsData>, OnInit {

  public parsed:PriceImport[];
  public errors:{
    sheetId:SheetId,
    message:string 
  }[];
  public statuses:{ [id:string]:string };
  public parsing:boolean;

  private context: ImportSheetsData;

  @ViewChild(ListSheetsComponent) list: ListSheetsComponent;


  constructor(
    private modal: Modal,
    private sheetsService: GoogleSheetsService,
    private sheetParserService: SheetParserService,
    private importsService: ImportsService,
    public dialog: DialogRef<any>
  ){ 
    this.context = dialog.context;
    this.parsing = false;
    this.clear();
  }

  ngOnInit(){}

  clear(){
    this.parsed = []; 
    this.errors = [];
    this.statuses = {};
  }

  importSelected():void {
    this.clear(); this.parsing = true;
    let ps: Promise<void>[] = [];
    this.list.selected.forEach((sheetId:SheetId) => {
      let ii:number;
      this.statuses[sheetId.id] = 'retrieving';
      ps.push(this.sheetsService.get(sheetId.id)
        .then((data:any) => {
          this.statuses[sheetId.id] = 'parsing';
          return this.sheetParserService.parse(data.result);
        }).then((i: PriceImport) => {
          this.statuses[sheetId.id] = 'uploading';
          ii = this.parsed.push(i);
          return this.importsService.upload(i).then(() => {
            this.statuses[sheetId.id] = 'success';
          }).catch(() => {
            this.statuses[sheetId.id] = 'error';
            this.parsed.splice(ii,1);
            this.errors.push({
              sheetId: sheetId,
              message: 'Database error, could not upload'
            });
          });
        }).catch(e => {
          this.statuses[sheetId.id] = 'error';
          let message:string = e.message;
          this.errors.push({
            sheetId: sheetId,
            message: e.message
          });
        })
      );
    });
    Promise.all(ps).then(() => {
      this.parsing = false;
    });
  }
  
  /* modal lifecycle*/ 

  open():void {
    console.log('hi');
  }

  close():void {
    this.dialog.close();
  }

  beforeDismiss():boolean {
      return false;
  }

  beforeClose():boolean {
      return false;
  }

  /* end modal lifecycle*/

}