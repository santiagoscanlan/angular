import { Component, OnInit } from '@angular/core';
import {VideoResult} from "../video-result/video-result"

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  inputs:["results"]
})
export class SearchResultsComponent implements OnInit {
results: VideoResult[]
  constructor() { }

  ngOnInit() {
  }

}
