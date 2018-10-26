import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.css']
})
export class PhotoGridComponent implements OnInit {

  @Input() photosToDisplay;

  constructor() { }

  ngOnInit() {
  }

}
