import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { YoutubeAppComponent } from './youtube-app/youtube-app.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { VideoResultComponent} from "./video-result/video-result.component";
import{API_URL,API_KEY,YoutubeService} from "./services/youtube.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    YoutubeAppComponent,
    SearchResultsComponent,
    VideoResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{provide: API_URL, useValue: API_URL}, {provide: API_KEY,useValue:API_KEY},YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
