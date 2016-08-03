import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Upload } from '../../models/upload.d.ts';

@Component({
  selector: 'blsp-upload-list',
  templateUrl: './app/uploads/components/image-select/upload-list.component.html',
  styleUrls: ['./app/uploads/components/image-select/upload-list.component.css'],
  directives: [],
  pipes: []
})
export class UploadListComponent {

  @Input() list: Array<any>;
  @Output('item-selected') itemSelected = new EventEmitter();

  public selected: Upload = null;

  private rowClick(item:Upload, row:HTMLElement){
  	this.selected = item;
  	this.itemSelected.emit(item);
  }

}