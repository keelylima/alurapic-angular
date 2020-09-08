import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ap-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent implements OnInit {
  @Input() url = '';
  @Input() description = '';

  constructor() {}

  ngOnInit(): void {}
}
