import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {   
  AngularFire, 
  FirebaseListObservable,
  FirebaseObjectObservable 
} from 'angularfire2';

// modal imports
import { Modal } from 'angular2-modal/plugins/bootstrap/index';
import { ModalComponent } from 'angular2-modal/index';
import { DialogRef } from 'angular2-modal/models/dialog-ref';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';

// modal input data 
export class PriceUnitData extends BSModalContext {
  constructor(public priceUnit: any) { //<PriceUnit>
    super();
  }
}

@Component({
  selector: 'blsp-price-unit',
  templateUrl: './app/prices/components/price-unit/price-unit.component.html',
  styleUrls: [
    './app/prices/components/price-unit/price-unit.component.css',
  ],
  directives: [],
  pipes: [ ]
})
export class PriceUnitComponent implements ModalComponent<PriceUnitData>, OnInit {

  public context: PriceUnitData;
  private priceUnit: any = {
    "amtDef": "amount",
    "amount": 1541,
    "priceSurce": "priceSourceKey-00003",
    "cosmetic": "promotional",
    "priceType": "DC",
    "fieldName": "DC1-14",
    "label": "1 - 14 Units"
  }

  private PRICES_PATH: string = '/prices-4';

  //ui vars
  private contentReq: string = 'dateRange';

  constructor( 
    private af: AngularFire,
    public dialog: DialogRef<any> 
  ){
    this.context = dialog.context;
  }

  ngOnInit() {}

  private getPriceRef(pid: string){}

  /* modal lifecycle*/ 

  private close(){
    this.dialog.close();
  }

  beforeDismiss(): boolean {
      return false;
  }

  beforeClose(): boolean {
      return false;
  }

  /* end modal lifecycle*/ 

}