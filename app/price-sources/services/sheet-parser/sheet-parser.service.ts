import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

//models
import { PriceImport } from '../../models/price-import/PriceImport.d';
import { PriceImportColumn } from '../../models/price-import-column/PriceImportColumn.d';


//utils
import { grab } from '../../../utils/grab/grab.function';

@Injectable()
export class SheetParserService {

  static columnTypes: string[] =  [
    'PriceUnit', 'PriceUnitProperty'
  ];

  static dataTypes: string[] = [
    'number', 'string', 'date'
  ];

  static priceTypes: string[] = [
    'MSRP', 'STA', 'DC', 'MSP', 'MSRP-PS', 'MSRP-PSR' 
  ];

  static metaRowsNum: number = 3;

  constructor(){}

  public parse(sheet:any): Promise<PriceImport>{ // sheet:<GoogleSheet>
    return new Promise((resolve, reject) => {
      
      let priceImport: PriceImport = {
        name: sheet.properties.title,
        source: "Google Sheet",
        importedDate: Date.now(),
        importedBy: "(user)",
        columnDefs: [],
        rowData: []
      };
      
      let sheetRows: Array<any> = this.grab({
        path:'sheets.0.data.0.rowData', 
        obj: sheet,
        allowUndefined: false,
        allowedValues: null,
        errorMessage: 'Could not retrieve data from Google Sheet'
      });

      // meta
      sheetRows[0].values.forEach((row:any, index:number) => {
        
        let columnDef: PriceImportColumn;

        let columnType: string = this.grab({
          path: 'effectiveValue.stringValue',
          obj: row,
          allowUndefined: false,
          allowedValues: SheetParserService.columnTypes,
          errorMessage: 
            `Unknown column Type. \n` 
          + `Row: 0 \n`
          + `Cell: ${index} \n`
          + `Allowed column types: ${SheetParserService.columnTypes.toString()} \n`
        });

        priceImport.columnDefs[index] = this.grabColumnDef(columnType,index,sheetRows);

      });

      // data
      sheetRows.forEach((row:any,i:any) => {

        //skip meta rows
        if(i > SheetParserService.metaRowsNum){
          
          let r:any[] = [];

          row.values.forEach((cell:any,index:any) => {        
            let colDef = priceImport.columnDefs[index];

            if(!colDef){ 
              throw Error(`No column definition for this cell. \n` 
                + `Row: ${i} \n`
                + `Cell: ${index} \n`
              );
            }

            if(colDef.dataType === 'number'){
              r[index] = this.grab({
                path:'effectiveValue.numberValue', 
                obj: cell,
                allowUndefined: false,
                allowedValues: null,
                errorMessage: 
                  `Invalid Cell Data \n` 
                + `Row: ${i} \n`
                + `Cell: ${index} \n`
              });
            }
            if(colDef.dataType === 'string'){
              r[index] = this.grab({
                path:'effectiveValue.stringValue', 
                obj: cell,
                allowUndefined: false,
                allowedValues: null,
                errorMessage: 
                  `Invalid Cell Data \n` 
                + `Row: ${i} \n`
                + `Cell: ${index} \n`
              });
            }
            if(colDef.dataType === 'date'){
              r[index] = Date.parse(this.grab({
                path:'effectiveValue.numberValue', 
                obj: cell,
                allowUndefined: false,
                allowedValues: null,
                errorMessage: 
                  `Invalid Cell Data \n` 
                + `Row: ${i} \n`
                + `Cell: ${index} \n`
              }));
            }
          });

          priceImport.rowData[i] = r;
          
        }

      });

      resolve(priceImport);

    });  
  }

  private grabColumnDef(columnType: string, index: number, sheetRows: any): PriceImportColumn{
    switch(columnType){
      case 'PriceUnit': return this.grabPriceUnitColumnDef(index,sheetRows);
      case 'PriceUnitProperty': return this.grabPriceUnitPropertyColumnDef(index,sheetRows); 
      default: 
        throw new Error(
          `No grabber defined for column type "${columnType}". \n`
        + `Row: 0 \n`
        + `Cell: ${index} \n`
        );
    }
  }

  private grabPriceUnitColumnDef(columnIndex: number, sheetRows: any): PriceImportColumn {
    let fieldName: string = this.grab({
      path: `1.values.${columnIndex}.effectiveValue.stringValue`,
      obj: sheetRows,
      allowUndefined: false,
      allowedValues: null,
      errorMessage: 
        `Could not read fieldName. \n` 
      + `Row: 1 \n`
      + `Cell: ${columnIndex} \n`
    });
    
    let priceType: string = this.grab({
      path: `2.values.${columnIndex}.effectiveValue.stringValue`,
      obj: sheetRows,
      allowUndefined: false,
      allowedValues: SheetParserService.priceTypes,
      errorMessage: 
        `Invalid PriceType. \n` 
      + `Row: 2 \n`
      + `Cell: ${columnIndex} \n`
      + `Allowed priceTypes: ${SheetParserService.priceTypes.toString()}`
    });

    let label: string = this.grab({
      path: `3.values.${columnIndex}.effectiveValue.stringValue`,
      obj: sheetRows,
      allowUndefined: false,
      allowedValues: null,
      errorMessage: 
        `Could not read label. \n` 
      + `Row: 3 \n`
      + `Cell: ${columnIndex} \n`
    });

    let columnDef: PriceImportColumn = {
      columnType: 'PriceUnit',
      dataType: 'number',
      fieldName: fieldName,
      priceType: priceType,
      label: label,
    };

    return columnDef;
  }

  private grabPriceUnitPropertyColumnDef(columnIndex: number, sheetRows: any): PriceImportColumn {
    
    let propertyName: string = this.grab({
      path: `1.values.${columnIndex}.effectiveValue.stringValue`,
      obj: sheetRows,
      allowUndefined: false,
      allowedValues: null,
      errorMessage: 
        `Could not read propertyName. \n` 
      + `Row: 1 \n`
      + `Cell: ${columnIndex} \n`
    });

    let dataType: 'string' | 'number' | 'date' = this.grab({
      path: `2.values.${columnIndex}.effectiveValue.stringValue`,
      obj: sheetRows,
      allowUndefined: false,
      allowedValues: SheetParserService.dataTypes,
      errorMessage: 
        `Invalid dataType. \n` 
      + `Row: 2 \n`
      + `Cell: ${columnIndex} \n`
      + `Allowed priceTypes: ${SheetParserService.dataTypes.toString()}`
    });

    let label: string = this.grab({
      path: `3.values.${columnIndex}.effectiveValue.stringValue`,
      obj: sheetRows,
      allowUndefined: false,
      allowedValues: null,
      errorMessage: 
        `Could not read label. \n` 
      + `Row: 3 \n`
      + `Cell: ${columnIndex} \n`
    });

    let columnDef: PriceImportColumn = {
      columnType: 'PriceUnitProperty',
      dataType: dataType,
      propertyName: propertyName,
      label: label,
    };

    return columnDef;
  }

  private grab({path, obj, allowUndefined, allowedValues, errorMessage}){
    let val: any;

    //grab val
    try {
      val = grab(path, obj);
    } catch(e){
      throw new Error(errorMessage);
    }

    //allowUndefined
    if(!allowUndefined && typeof val === 'undefined'){
      throw new Error(errorMessage);
    }

    //allowedValues
    if(  allowedValues 
      && Array.isArray(allowedValues)
      && allowedValues.indexOf(val) < 0 ){
      throw new Error(errorMessage);
    }

    return val;
  }

}