import { Component, OnInit } from '@angular/core';
import{SpotifyServiceService} from "../spotify-service.service"
import{ActivatedRoute} from "@angular/router"
import{Location} from "@angular/common"

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  track: Object;
  id:String;

  constructor(public spotify: SpotifyServiceService,public route: ActivatedRoute, public location: Location) {
    this.route.params.subscribe(params=>this.id=params["id"])
   }
   renderTrack(res){
     if(res){
       this.track=res
     }
   }
   back(){
     this.location.back()
 }
  ngOnInit() {
    this.spotify.getTrack(this.id).subscribe(res=>this.renderTrack(res))
  }

}
