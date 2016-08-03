import { PriceImportColumn } from '../price-import-column/PriceImportColumn.d';

export interface PriceImport {
  name: string;
  source: string; // eg: Google Sheet
  importedDate: number; // milliseconds since Epoch
  importedBy: string; // userId
  columnDefs: PriceImportColumn[];
  rowData: any[][];
}
