import { Injectable } from '@angular/core';
import {Http} from "@angular/http"
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class SpotifyServiceService {

static BASE_URL: string = `https://api.spotify.com/v1`;

  constructor(public http: Http) { }

  query(URL:String, params?: String[]){
    var queryURL = `${SpotifyServiceService.BASE_URL}${URL}`;

    (params && params.length)?queryURL+="?"+params.join("&"):String

    return this.http.request(queryURL).map(res =>res.json())
  }
  search(query:String, type:String){
    let params : String[]= [
      `q=${query}`,
      `type=${type}`
    ]
    return this.query("/search", params)
  }

  searchByTrack(query){
  return this.search(query, "track")
  }
  getTrack(id){
    return this.query(`/tracks/${id}`)
  }
  getAlbum(id){
    return this.query(`/albums/${id}`)
  }

}
