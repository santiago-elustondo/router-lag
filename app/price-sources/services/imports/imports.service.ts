import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {   
  AngularFire, 
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2';

//services
import { SheetParserService } from '../sheet-parser/sheet-parser.service';

//models
import { PriceImport } from '../../models/price-import/PriceImport.d';

@Injectable()
export class ImportsService {

  public names:Object;

  // db
  private importsRef: FirebaseListObservable<any>;
  private importsNameIndexRef: FirebaseObjectObservable<any>;
  private namesSub: any; // subscription

  constructor(
    private af: AngularFire,
    private sheetParser: SheetParserService
  ){
    this.importsRef = this.af.database.list('price_source_imports');
    this.importsNameIndexRef = this.af.database.object('price_source_imports_names');
    this.namesSub = this.importsNameIndexRef.subscribe((names:any) => this.names = names);
  }

  public upload(sheet: PriceImport):Promise<any>{
    sheet.name = this.nameSuffix(sheet.name);
    return this.importsRef.push(sheet).then((data:any) => {
      let entry = {}; entry[sheet.name] = data.key; 
      this.importsNameIndexRef.update(entry);
    });
  }

  private nameSuffix(name:string):string{
    if(this.names[name]){
      name += '-copy';
      return this.nameSuffix(name);
    } else {
      return name;
    }
  }

}