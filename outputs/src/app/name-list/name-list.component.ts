import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.css'],
  outputs: ["nameSelected"]
})
export class NameListComponent implements OnInit {
nameSelected: EventEmitter<string>
names : string[]
  constructor() {
    this.nameSelected = new EventEmitter()
    this.names = ["Santi", "Toni", "Guille"]
    }

    nameClicked(name){
      console.log("clicked!")
      this.nameSelected.emit(name)
    }

  ngOnInit() {
  }

}
