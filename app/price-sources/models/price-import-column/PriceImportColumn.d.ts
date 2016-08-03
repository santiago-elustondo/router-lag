export interface PriceImportColumn {
  columnType: string;
  dataType: string; // if priceUnit, then always 'number'
  label: string; 
  priceType?: string; // only for priceUnit
  fieldName?: string; // only for priceUnit
  propertyName?: string; // only for priceUnitProperty
} 

/*
ROWS IN SHEET
  priceUnit:
    1: fieldName
    2: priceType
    3: Label
  priceUnitProperty:
    1: propertyName
    2: dataType
    3: label
*/
