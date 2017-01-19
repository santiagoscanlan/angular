import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import{MyService} from "./my.service";
import {MockMyService} from "./mock-my.service";
import {SayMyNameService} from "./say-my-name.service"
import{UserService} from "./user.service";
import {GetInjectorsService} from "./get-injectors.service";
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    GetInjectorsService,
    {provide: MyService, useClass: MockMyService},
    {provide:UserService, useClass:UserService},
    {provide: SayMyNameService, useFactory: (userService)=>{return new SayMyNameService(userService.getRandomUser())}, deps:[UserService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
