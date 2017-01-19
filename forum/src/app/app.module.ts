import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import{store, AppStore} from "./redux/store"

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { ThreadComponent } from './thread/thread.component';
import {MessageComponent} from "./message/message.component"


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ThreadComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{provide: AppStore, useValue: store}],
  bootstrap: [AppComponent]
})
export class AppModule { }
