import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'track-result',
  templateUrl: './track-result.component.html',
  styleUrls: ['./track-result.component.css'],
  inputs:["track"]
})
export class TrackResultComponent implements OnInit {
  track : Object
  constructor() { }

  ngOnInit() {
  }

}
