import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import{platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import{RouterModule, Routes} from "@angular/router"
import{LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from "@angular/common"

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { TrackResultComponent } from './search/track-result/track-result.component';

import{SpotifyServiceService} from "./spotify-service.service";
import { TrackComponent } from './track/track.component';
import { AlbumComponent } from './album/album.component';

const routes: Routes =[
  {path: "", redirectTo: "search", pathMatch:"full"},
  {path:"search", component: SearchComponent},
  {path:"tracks/:id",component:TrackComponent},
  {path:"albums/:id", component:AlbumComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TrackResultComponent,
    TrackComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, SpotifyServiceService],
  bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule).catch((err: any) => console.error(err))
