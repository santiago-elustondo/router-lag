import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {   
  AngularFire, 
  FirebaseListObservable,
  FirebaseObjectObservable 
} from 'angularfire2';


@Component({
  selector: 'bs-list-products',
  templateUrl: './app/products/components/list-products/list-products.component.html',
  styleUrls: ['./app/products/components/list-products/list-products.component.css'],
  directives: [],
  pipes: []
})
export class ListProductsComponent implements OnInit {

  @Output('product-clicked') productClick = new EventEmitter();

  private products: Array<any>;
  private productsRef: FirebaseListObservable<any>;
  private productsSubscription: any;

  private PRODUCTS_PATH: string = '/products';

  constructor(private af: AngularFire){}

  ngOnInit(){
    this.productsRef = this.af.database.list(this.PRODUCTS_PATH);
    this.productsSubscription = this.productsRef.subscribe(p => {
      this.products = p;
    });
  }

  private productClicked(product:any){
    this.productClick.emit(product);
  }

}