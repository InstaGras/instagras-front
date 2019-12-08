import { Component, OnInit } from '@angular/core';
import { PopoverController, Events } from '@ionic/angular';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent implements OnInit {

  constructor(
    public popoverController: PopoverController,
    private events: Events
  ) { }

  ngOnInit() {}

  Unsubscribe() {
    this.close('unsubscribe');
  }

  close(data?: string) {
    this.popoverController.dismiss(data);
  }

}
