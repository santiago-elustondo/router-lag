import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
export class CreateProductData extends BSModalContext {
  constructor() {
    super();
  }
}

@Component({
  selector: 'bs-create-product',
  templateUrl: './app/products/components/create-product/create-product.component.html',
  styleUrls: ['./app/products/components/product-form.css'],
  directives: [],
  pipes: []
})
export class CreateProductComponent implements ModalComponent<CreateProductData>, OnInit {

  private product:any;

  private ui:any;
  private productsRef:FirebaseListObservable<any>;
  private uiRef:FirebaseObjectObservable<any>;
  private active:boolean = true;

  private PRODUCTS_PATH: string = '/products';
  private UI_PATH: string = '/component_contents_UI';

  //UI stuff
  private sections = {
    details: { open: false },
    prices: { open: false }
  };

  //stuck in loading screen fix
  private hack:boolean = false;

  constructor( 
    private af: AngularFire,
    public dialog: DialogRef<any> 
  ){
    
    //this shouldnt be here
    this.product = {
      prices: {
        msrp: {},
        msp: {},
        setPrice: [],
        gotoPrice: {}
      }
    }

  }

  ngOnInit() {
    this.productsRef = this.af.database.list(this.PRODUCTS_PATH);
    this.uiRef = this.af.database.object(this.UI_PATH);
    let subscription = this.uiRef.subscribe(ui => {
      this.ui = ui;
      subscription.unsubscribe(); //only get it once
    });

    //stuck in loading screen fix
    setInterval(this.wakeUp(),1000);
  }

  private onSubmit(event:Event){
    event.preventDefault();
    this.productsRef.push(this.product)
      .then(()=>{/*..*/})
      .catch(()=>{/*..*/});
    this.dialog.close();
  }

  private clearProperties(properties: Array<string>){
    properties.forEach(p => {
      this.product[p] = null;
    });
  }
  
  private handleKeyPress(event: KeyboardEvent) {
    if ( event.keyCode === 13 ) //if "enter" 
      console.log('enter');
  }

  private addSetPrice(amount:string,label:string){
    this.product.prices.setPrice.push({
      amount: amount,
      label: label,
    });
  }

  private toggleSection(section:string){
    if(this.sections[section])
      this.sections[section].open = !this.sections[section].open;
  }

  //stuck in loading screen fix
  private wakeUp(){
    this.hack = !this.hack;
  }

  /*  modal lifecycle */

  private close(){
    this.dialog.close();
  }

  beforeDismiss(): boolean {
      return false;
  }

  beforeClose(): boolean {
      return false;
  }

  /* end modal lifecycle */

}