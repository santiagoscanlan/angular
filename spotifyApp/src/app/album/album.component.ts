import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import{SpotifyServiceService} from "../spotify-service.service"

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
album: Object
id:String
  constructor(public route: ActivatedRoute, public spotify:SpotifyServiceService) {
    this.route.params.subscribe(params=>this.id=params["id"])
  }

  renderAlbum(res){
    if(res){
      this.album=res
    }
  }

  ngOnInit() {
    this.spotify.getAlbum(this.id).subscribe(res=>this.renderAlbum(res))
  }

}
