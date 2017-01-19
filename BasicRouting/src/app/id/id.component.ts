import { Component, OnInit } from '@angular/core';
import {PlaceholderService} from "../services/placeholder.service"
import{ActivatedRoute} from "@angular/router"
import{Location} from "@angular/common"

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.css']
})
export class IdComponent implements OnInit {
element: Object
id: String
type: String
  constructor(public placeholder: PlaceholderService,public route: ActivatedRoute, public location:Location) {
    this.route.params.subscribe(params=>this.id=params["id"])
    this.type=this.location.path().split("/")[1]
  }

  ngOnInit() {
    this.placeholder.getElement(this.type, this.id).subscribe(res=>this.element=res)
  }
  back(){
    this.location.back()
  }

}
