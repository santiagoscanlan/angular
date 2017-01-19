import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic"
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import{LocationStrategy, HashLocationStrategy} from "@angular/common";
import{Routes, RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import{PlaceholderService} from "./services/placeholder.service";
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { MainComponent } from './main/main.component';
import { IdComponent } from './id/id.component'

const childRoutes : Routes =[
  {path: "", redirectTo:"main", pathMatch:"full"},
  {path:"main", component:MainComponent},
  {path:":id", component: IdComponent }
];
const routes: Routes = [
  {path: "", redirectTo:"home", pathMatch:"full"},
  {path: "home", component:HomeComponent},
  {path: "users", component: UsersComponent, children:childRoutes},
  {path:"posts", component:PostsComponent, children:childRoutes}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    IdComponent,
    PostsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide:LocationStrategy, useClass: HashLocationStrategy}, PlaceholderService],
  bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule).catch((err:any)=>console.error(err))
