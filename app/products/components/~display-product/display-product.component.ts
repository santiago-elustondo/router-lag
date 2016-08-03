import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { PrettyJsonPipe } from 'angular2-prettyjson';
import {   
  AngularFire, 
  FirebaseListObservable,
  FirebaseObjectObservable 
} from 'angularfire2';


@Component({
  selector: 'bs-display-product',
  templateUrl: './app/display-product.component.html',
  styleUrls: ['./app/display-product.component.css'],
  directives: [],
  pipes: [ PrettyJsonPipe ]
})
export class DisplayProductComponent implements OnInit {

  private product: FirebaseObjectObservable<any>;

  @Input() set productID(pid: string) {
    this.product = this.af.database.object('/products/' + pid);
  }

	constructor( private af: AngularFire ) { }

	ngOnInit() { }

}