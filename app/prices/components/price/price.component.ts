import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { CapitalizePipe } from "../../../utils/index";
import { Modal } from 'angular2-modal/plugins/bootstrap/index';
import {   
  AngularFire, 
  FirebaseListObservable,
  FirebaseObjectObservable 
} from 'angularfire2';

//components
import { PriceUnitComponent, PriceUnitData } from '../price-unit/price-unit.component';

@Component({
  selector: 'blsp-price',
  templateUrl: './app/prices/components/price/price.component.html',
  styleUrls: [
    './app/prices/components/price/price.component.css',
  ],
  directives: [],
  pipes: [ CapitalizePipe ]
})
export class PriceComponent implements OnInit {

  @Input() productId: string;

  private price: any; //<Price>
  private priceUnits: Array<any>; //<PriceUnit>

  private priceRef: FirebaseObjectObservable<any>;
  private PRICES_PATH: string = '/prices-4';

  constructor( 
    private modal: Modal,
    private af: AngularFire
  ){}

  ngOnInit() { 
    this.getPriceRef(this.productId);
  }

  private getPriceRef(pid: string){
    if(!pid) {
      this.price = this.priceRef = null;
    } else {
      this.priceRef = this.af.database.object(this.PRICES_PATH + '/' + pid);
      this.priceRef.subscribe(price => {
        delete price['$key'];
        this.price = price;
        this.priceUnits = []; 
        Object.keys(price.priceUnits).forEach((field:string) => {
          this.priceUnits.push(this.price.priceUnits[field]);
        });
      });
    }
  }

  private viewPriceUnit(){
    return this.modal
      .open(PriceUnitComponent, 
        new PriceUnitData({}));
  }

}