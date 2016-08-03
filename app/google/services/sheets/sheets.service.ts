import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

//services
import { GoogleApiService } from '../gapi/gapi.service';


@Injectable()
export class GoogleSheetsService {

  public  active: BehaviorSubject<boolean>;
  private drive:  any;
  private sheets: any;

  private INACTIVE_MSG: string = 'sheets service not ready';

  constructor(
    private gapiService: GoogleApiService
  ){
    this.active = new BehaviorSubject<boolean>(false);
    this.toggleActive(this.gapiService.isSignedIn.getValue());
    this.gapiService.isSignedIn.subscribe((active:boolean) => this.toggleActive(active));
  }

  list(): Promise<any> {
    return this.doIfActive(() => this.drive.files.list({
      q: "mimeType = 'application/vnd.google-apps.spreadsheet'"
    }));
  }

  get(sheetId: string): Promise<any>  {
    return this.doIfActive(() => this.sheets.spreadsheets.get({
      spreadsheetId: sheetId,
      includeGridData: true,
      fields: "properties(locale,timeZone,title),sheets(data(rowData(values(effectiveValue,formattedValue,userEnteredValue)),startColumn,startRow),properties(index,rightToLeft,sheetId,sheetType,title)),spreadsheetId"
    }));
  }

  private doIfActive(action: Function, usePromise: boolean = true){
    if(this.active.getValue()) {
      return usePromise? Promise.resolve(action()): action();
    } else {
      return usePromise? Promise.reject(this.INACTIVE_MSG) : null;
    }
  }

  private toggleActive(active:boolean){
    this.drive = active? this.gapiService.gapi.client.drive : null;
    this.sheets = active? this.gapiService.gapi.client.sheets : null;
    this.active.next(active);
  }

}