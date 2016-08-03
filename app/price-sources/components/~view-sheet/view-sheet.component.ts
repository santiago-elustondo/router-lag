import { Component, ChangeDetectorRef, OnInit, Input } from '@angular/core';

//services
import { GoogleSheetsService } from '../../../google/index';


@Component({
  selector: 'blsp-view-sheet',
  templateUrl: './app/price-sources/components/view-sheet/view-sheet.component.html',
  styleUrls: [ './app/price-sources/components/view-sheet/view-sheet.component.css' ],
  directives: [],
  pipes: []
})
export class ViewSheetComponent implements OnInit {

  @Input() set sheetId(value: string) {
    this._sheetId = value;
    this.getSheet();
  }

  public sheet: any; //<GoogleSpreadSheet>
  private _sheetId: string;
  
  private connectionActive: boolean = false;
  private loading: boolean = false;

  constructor(
    private sheetsService: GoogleSheetsService,
    private changeDetectorRef: ChangeDetectorRef
  ){}

  public ngOnInit(){
    this.sheetsService.active.subscribe((active:boolean) => {
      if(active) this.getSheet();
      this.connectionActive = active;
      this.changeDetectorRef.detectChanges();
    });
  }

  private getSheet(){
    this.sheet = null;
    if(this._sheetId){
      this.loading = true;
      this.sheetsService.get(this._sheetId)
      .then((data:any) => {
        this.sheet = data.result
        this.loading = false;
      })
      .catch((err:Error) => {
        this.loading = false;
      });
    }
  }

}