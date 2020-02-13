import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss'],
})
export class SharingComponent implements OnInit {
  create(arg0: { component: typeof SharingComponent; event: any; animated: boolean; showBackdrop: boolean; }) {
    throw new Error("Method not implemented.");
  }

  constructor() { }

  ngOnInit() {}

}
