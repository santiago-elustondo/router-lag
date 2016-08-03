import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';

// modal stuff
import { Modal } from 'angular2-modal/plugins/bootstrap/index';

//components
import { ListProductsComponent } from '../list-products/list-products.component';
import { EditProductComponent, EditProductData } from '../edit-product/edit-product.component';
import { CreateProductComponent, CreateProductData } from '../create-product/create-product.component';
//import { DisplayProductComponent } from './display-product.component';
//import { EditUploadsComponent } from "./uploads/edit-uploads.component";

@Component({
  selector: 'bs-products',
  templateUrl: './app/products/components/products/products.component.html',
  styleUrls: ['./app/products/components/products/products.component.css'],
  directives: [
    EditProductComponent,
    ListProductsComponent,
    CreateProductComponent,
    //DisplayProductComponent,
    //EditUploadsComponent
  ],
  pipes: []
})
export class ProductsComponent implements OnInit {

  constructor(
    private modal: Modal,
    public viewContainer: ViewContainerRef
  ){}

  ngOnInit(){}

  openEdit(product:any) {
    return this.modal
      .open(EditProductComponent, 
        new EditProductData(product['$key']));
  }

  openCreate() {
    return this.modal
      .open(CreateProductComponent, 
        new CreateProductData());
  }
}    