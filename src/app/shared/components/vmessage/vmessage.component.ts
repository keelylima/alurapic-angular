import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ap-vmessage',
  templateUrl: './vmessage.component.html',
})
export class VmessageComponent implements OnInit {
  @Input() text = '';

  constructor() {}

  ngOnInit(): void {}
}
