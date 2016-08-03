import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Upload } from "../models/upload.d.ts";
import {   
  AngularFire, 
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2';

@Injectable()
export class UploadService {

  // output
  public stream: Subject<Array<Upload>>;
  public isActive: Subject<boolean>;

  // parameters (setters)
  private _targetId :string;
  private _targetType :string; // ex: 'customer'
  private _uploadType :string; // ex: 'profilePic'

  // internals
  public _uploads: Array<Upload>;
  public active: boolean;

  // storage
  private firebase: any;
  private fStorage: any;
  private storageRef: any;

  // db
  private dbRef: FirebaseListObservable<any>;
  private dbSub: any; // subscription

  constructor( private af: AngularFire ) {
    this.firebase = require('firebase');  //no Injectable definition
    this.stream = new Subject<Array<Upload>>();
    this.isActive = new Subject<boolean>();
  }

  public init(params:any) {
    
    this.getInitParams(params);
    
    //check required params
    if(!( this._targetId
       && this._targetType
       && this._uploadType )){ 

      //clean out connections, make inactive
      this.storageRef = null;
      this.dbRef = this.dbSub = null;
      this.isActive
        .next(this.active = false);

    } else {

      //storage ref
      this.fStorage = this.firebase.storage();
      this.storageRef = this.fStorage.ref(
        'uploads/' +  this._targetType 
        + '/' + this._targetId
        + '/' + this._uploadType
      );

      //db ref
      this.dbRef = this.af.database.list(
        this._targetType 
        + '/' + this._targetId
        + '/uploads'
        + '/' + this._uploadType
      );
      this.dbSub = this.dbRef.subscribe(rawUploads => {
        
        this.parse(rawUploads)
          .then(uploads => this.fetchDownloadURLs(uploads))
          .then((uploads) => {
            this.stream.next(this._uploads = uploads);
          });
      });

      //up and running
      this.isActive
        .next(this.active = true);

    }

  }


  /* CRUD operations */

  private add(file: File, data: any){

    let meta = this.grabMeta(file, 'now');

    //register
    let registerTask = this.dbRef.push(meta);
    let key = registerTask.key;
    registerTask.catch(error => console.log(error));


    //upload
    let uploadTask = this.storageRef.child(key)
      .put(file, meta);

  }

  /* end CRUD */


  private parse(raw: Array<any>): Promise<Array<Upload>>{
    return new Promise((resolve, reject) => {
      let uploads: Array<Upload> = [];
      raw.forEach(r => {
        let upload: Upload = {
          key: r['$key'],
          data: r.data,
          meta: r.meta
        }
        uploads.push(upload);
      });
      resolve(uploads);
    });
  }

  private fetchDownloadURLs(uploads: Array<Upload>): Promise<Array<Upload>>{
    let ps:any[] = [];
    uploads.forEach((upload:Upload,index:number) => {
      let p = this.storageRef.child(upload.key)
        .getDownloadURL().then((value:string) => {
          uploads[index].downloadURL = value;
        });
      ps.push(p);
    });
    return Promise.all(ps).then(() => uploads);
  }

  private getInitParams(params:any){
    if(params){
      if(params.targetId)
        this._targetId = params.targetId;
      if(params.targetType)
        this._targetType = params.targetType;
      if(params.uploadType)
        this._uploadType = params.uploadType;
    }
  }

  private grabMeta(obj:any,dateSrc:string){

    let meta:any = {};

    // get date
    if(dateSrc === 'obj'){
      meta.date = obj.date;
    } else if (dateSrc === null) {
      meta.date = null;
    } else if (dateSrc === 'now') {
      meta.date = Date.now(); 
    } else {
      meta.date = Date.now();
    } 

    meta.name = obj.name;
    meta.size = obj.size;
    meta.type = obj.type;
    return meta;

  }

  public set targetId(id:string){
    this._targetId = id;
    this.init(null);
  }

  public set targetType(type:string){
    this._targetType = type;
    this.init(null);
  }

  public set uploadType(type:string){
    this._uploadType = type;
    this.init(null);
  }

}