import { Injectable } from '@angular/core';

//utils
import { isInteger } from '../is-integer/is-integer.function';

export function grab(path:string, obj: any) {
  var schema = obj;
  var pList = path.split('.');
  var len = pList.length;
  for(var i = 0; i < len-1; i++) {
      var elem: any = pList[i];
      if( isInteger(elem) ) elem = parseInt(elem);
      if( !schema[elem] ) schema[elem] = {}
      schema = schema[elem];
  }

  return schema[pList[len-1]];
}