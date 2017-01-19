import { Injectable } from '@angular/core';
import{Http} from "@angular/http"
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PlaceholderService {
static BASE_URL:String = "https://jsonplaceholder.typicode.com/"

  constructor(public http: Http) { }
query(type, id){
  var Url: string= `${PlaceholderService.BASE_URL}${type}/${id}`
  return this.http.request(Url).map(res=>res.json())
}
getPost(id){
  return this.query("posts", id)
}
getUser(id){
  return this.query("users", id)
}
getElement(type, id){
  if(type==="users"){
    return this.getUser(id)
  }else{
    return this.getPost(id)
  }
}
}
