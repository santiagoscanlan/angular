import { Component, OnInit } from '@angular/core';
import {Message} from "../models/message-model"
@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  inputs: ["message"]
})
export class MessageComponent implements OnInit {
public message : Message
  constructor() { }

  ngOnInit() {
  }

}
