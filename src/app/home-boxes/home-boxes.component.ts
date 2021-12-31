import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-boxes',
  templateUrl: './home-boxes.component.html',
  styleUrls: ['./home-boxes.component.css']
})
export class HomeBoxesComponent implements OnInit {

  date: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
