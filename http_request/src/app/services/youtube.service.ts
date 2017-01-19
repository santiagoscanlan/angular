import { Injectable, Inject } from '@angular/core';
import{Http} from "@angular/http"
import{VideoResult} from "../video-result/video-result"

export const API_KEY:String="AIzaSyCVn2FYVgmAQ1NpToQ-qmSvLcxCY8HFx20";
export const API_URL:String= "https://www.googleapis.com/youtube/v3/search";

@Injectable()
export class YoutubeService {
  constructor(@Inject(API_KEY) private apiKey:String, @Inject(API_URL) private apiUrl: String, public http: Http) {

   }
   get(query){
     let params =[
       `q=${query}`,
       `key=${this.apiKey}`,
       `part=snippet`,
       `type=video`,
       `maxResults=10`
     ].join("&")
     return this.http.request(`${this.apiUrl}?${params}`).map(res=> res.json().items.map(item => new VideoResult({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          videoUrl: `http://youtube.com/watch?v=${item.id.videoId}`,
          thumbnailUrl: item.snippet.thumbnails.high.url
        })))
   }
}
