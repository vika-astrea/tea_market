import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-have-list',
  templateUrl: './have-list.component.html',
  styleUrls: ['./have-list.component.css']
})


export class HaveListComponent implements OnInit {

  //public skills = ["running","drawing","cooking"];


  @Input() public skills: any;

  constructor() { }

  ngOnInit(): void {
  }

}
