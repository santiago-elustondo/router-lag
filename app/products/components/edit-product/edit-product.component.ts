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
export class EditProductData extends BSModalContext {
  constructor(public productID: string) {
    super();
  }
}

@Component({
  selector: 'bs-edit-product',
  templateUrl: './app/products/components/edit-product/edit-product.component.html',
  styleUrls: [ './app/products/components/product-form.css' ],
  directives: [],
  pipes: []
})
export class EditProductComponent implements ModalComponent<EditProductData>, OnInit {

  public context: EditProductData;

  private product: Object;
  private ui: Object;
  private productRef: FirebaseObjectObservable<any>;
  private uiRef: FirebaseObjectObservable<any>;
  private active: boolean = true;

  private PRODUCTS_PATH: string = '/products';
  private UI_PATH: string = '/component_contents_UI';

  constructor( 
    private af: AngularFire,
    public dialog: DialogRef<any> 
  ){
    this.context = dialog.context;
    this.setProductID(dialog.context.productID);
  }

  ngOnInit() { 
    this.uiRef = this.af.database.object(this.UI_PATH);
    let subscription = this.uiRef.subscribe(ui => {
      this.ui = ui;
      subscription.unsubscribe(); //only get it once
    });
  }

  private onSubmit(formValues: any, event: any){
    event.preventDefault();
    let submitValues = this.processFormValues(formValues);
    this.productRef.update(submitValues);
    this.dialog.close();
  }

  private handleKeyPress(event: KeyboardEvent) {
    if(event.keyCode === 13) //if "enter" 
      console.log('enter');
  }

  private resetForm() {
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  private processFormValues(values: Object){
    let r = {};
    
    Object.keys(values).forEach((key) => {
      r[key] = (values[key] === undefined) ? null : values[key];
    });

    return r;
  }

  private clearProperties(properties: Array<string>){
    properties.forEach(p => {
      this.product[p] = null;
    });
  }

  private close(){
    this.dialog.close();
  }

  beforeDismiss(): boolean {
      return false;
  }

  beforeClose(): boolean {
      return false;
  }

  private setProductID(pid: string){
    this.productRef = this.af.database.object(this.PRODUCTS_PATH + '/' + pid);
    this.productRef.subscribe(product => {
      this.product = (
          product.hasOwnProperty('$value') 
          && !product['$value']
        ) ? null : product;
    });
  }
}