import { Component, OnInit } from '@angular/core';
import { VideoResult } from "../video-result/video-result"

@Component({
  selector: 'youtube-app',
  templateUrl: './youtube-app.component.html',
  styleUrls: ['./youtube-app.component.css'],
})
export class YoutubeAppComponent implements OnInit {
results: VideoResult[];
loading: boolean
  constructor() { }

  updateResults(results: VideoResult[]){
    this.results=results
  }
  ngOnInit() {
  }

}
