import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Upload } from '../../models/upload.d.ts';

@Component({
  selector: 'blsp-image-select',
  templateUrl: './app/uploads/components/image-select/image-select.component.html',
  styleUrls: ['./app/uploads/components/image-select/image-select.component.css'],
  directives: [],
  pipes: []
})
export class ImageSelectComponent {
  
  @ViewChild('imageDisplay') imageDisplay: ElementRef;
  @ViewChild('fileName') fileName: ElementRef;
  @ViewChild('placeholder') placeholder: ElementRef;

  //not currently used
  private FILENAME_PLACEHOLDER: string = 'no file selected';

  private _selectedImage: File;

  private selectImage(input: HTMLInputElement){

    if(!input.files.length) {
      this._selectedImage = null;
    } else {
      this._selectedImage = input.files[0];
      let reader = new FileReader();
      reader.onload = (e:any) => {
        this.imageDisplay
          .nativeElement.src = e.target.result;
      };
      reader.readAsDataURL(this._selectedImage); 
    }

  }

}