import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-need-list',
  templateUrl: './need-list.component.html',
  styleUrls: ['./need-list.component.css']
})
export class NeedListComponent implements OnInit {

  public skills = ["caring","longing","feeling"]

  constructor() { }

  ngOnInit(): void {
  }

}
