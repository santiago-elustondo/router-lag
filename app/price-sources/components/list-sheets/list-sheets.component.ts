import { Component, ChangeDetectorRef, Input, OnInit } from '@angular/core';

//services
import { GoogleSheetsService } from '../../../google/index';

//models
import { SheetId } from '../../models/sheet-id/SheetId.d';

@Component({
  selector: 'blsp-list-sheets',
  templateUrl: './app/price-sources/components/list-sheets/list-sheets.component.html',
  styleUrls: [ './app/price-sources/components/list-sheets/list-sheets.component.css' ],
  directives: [],
  pipes: []
})
export class ListSheetsComponent implements OnInit { 

  @Input() statuses: { [id:string]:string };
  
  public selected: SheetId[] = [];
  private sheets: Array<any> = [];

  constructor(
    private sheetsService: GoogleSheetsService,
    private changeDetectorRef: ChangeDetectorRef
  ){}

  public ngOnInit(){
    if(this.sheetsService.active.getValue()) this.getSheets();
    this.sheetsService.active.subscribe((active:boolean) => {
      if(active) { this.getSheets(); }
      else { this.clearSheets(); }
    });
  }

  public getSheets(){
    this.sheetsService.list().then((data:any) => {
      this.sheets = data.result.files;
      //this.changeDetectorRef.detectChanges();
    },(err:any) => {
      console.log(err);
    });
  }

  public clearSheets(){
    this.sheets = [];
    //this.changeDetectorRef.detectChanges();
  }

  private clickedSheet(id:string, name:string, tr:HTMLInputElement){
    
    let i:number;
    let alreadySelected:boolean = this.selected.some((s:SheetId,index:number) => {
      if(s.id === id){
        i = index;
        return true;
      }
    });

    if(alreadySelected){
      //deselect sheet
      this.selected.splice(i,1);
      tr.checked = false;
    } else {
      //select sheet
      let sheetId:SheetId = {id:id,name:name}; 
      this.selected.push(sheetId);
      tr.checked = true;
    }
  
  }


}