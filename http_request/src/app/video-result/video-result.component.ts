import { Component, OnInit } from '@angular/core';
import { VideoResult } from "./video-result";

@Component({
  inputs:["result"],
  selector: 'video-result',
  templateUrl: './video-result.component.html',
  styleUrls: ['./video-result.component.css']
})
export class VideoResultComponent implements OnInit{
 result: VideoResult
  constructor() {

  }

  ngOnInit() {
  }

}
