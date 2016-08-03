import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {   
  AngularFire, 
  FirebaseListObservable,
  FirebaseObjectObservable 
} from 'angularfire2';

@Component({
  selector: 'blsp-list-imports',
  templateUrl: './app/price-sources/components/list-imports/list-imports.component.html',
  styleUrls: [ './app/price-sources/components/list-imports/list-imports.component.css' ],
  directives: [],
  pipes: []
})
export class ListImportsComponent implements OnInit {

  @Output('importClick') importClick = new EventEmitter();

  private imports: Array<any>;
  private importsRef: FirebaseListObservable<any>;
  private importsSubscription: any;

  private IMPORTS_PATH: string = '/price_source_imports';

  constructor(private af: AngularFire){}

  ngOnInit(){
    this.importsRef = this.af.database.list(this.IMPORTS_PATH);
    this.importsSubscription = this.importsRef.subscribe(p => this.imports = p);
  }

  private importClicked(product:any){
    this.importClick.emit(product);
  }

}