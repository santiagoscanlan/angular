import { Component, OnInit } from '@angular/core';
import {SpotifyServiceService} from "../spotify-service.service";
import {Router, ActivatedRoute} from "@angular/router"


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query:String;
  results: Object

  constructor(private spotify: SpotifyServiceService,
  private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => this.query=params["query"] || "")
   }

   search(){
     if(!this.query){
       return;
     }
     this.spotify.searchByTrack(this.query).subscribe(res =>this.renderResults(res))
   }


   renderResults(res:any){
      this.results = null
      if(res && res.tracks && res.tracks.items){
      this.results = res.tracks.items
    }
   }

   submit(query){
     this.router.navigate(["search"], {queryParams: {query: query}}).then(_ =>this.search())
   }
  ngOnInit() {
    this.search()
  }

}
