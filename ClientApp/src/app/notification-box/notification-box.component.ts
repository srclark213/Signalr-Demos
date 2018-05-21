import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { List } from 'immutable';
import { SignalrService } from '../signalr.service';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html'
})
export class NotificationBoxComponent implements OnInit {

  notifications: Array<string> = [];

  constructor(private signalr: SignalrService) {
  }

  ngOnInit() {
    this.signalr.notifications.subscribe(next => this.onNotification(next));
  }

  onNotification(data: List<string>) {
    this.notifications = data.toArray();
  }

}
