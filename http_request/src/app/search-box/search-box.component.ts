import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import{Http, Response} from "@angular/http";
import{VideoResult} from "../video-result/video-result"
import{YoutubeService} from "../services/youtube.service"
import {Observable} from "rxjs"

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
  outputs: ["newResult", "loading"]
})
export class SearchBoxComponent implements OnInit {

  newResult: EventEmitter<VideoResult[]>
  loading: EventEmitter<boolean>

  constructor(public http: Http, public youtube: YoutubeService, public el: ElementRef) {
    this.newResult =  new EventEmitter<VideoResult[]>();
    this.loading = new EventEmitter<boolean>()
   }
   ngOnInit(){
  Observable.fromEvent(this.el.nativeElement, "keyup").map((e:any)=>e.target.value)
  .filter(value=>value.length>1)
  .debounceTime(250)
  .do(()=>this.loading.emit(true))
  .map(query=>this.youtube.get(query))
  .switch()
  .subscribe((results: VideoResult[]) =>{
    this.newResult.emit(results);
    this.loading.emit(false)
  })
}
}
