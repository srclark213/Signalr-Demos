import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../signalr.service';

@Component({
  selector: 'app-group-demo',
  templateUrl: './group-demo.component.html'
})
export class GroupDemoComponent implements OnInit {

  private group: string = null;

  constructor(private signalr: SignalrService) { }

  ngOnInit() {
    this.signalr.group.subscribe(next => this.group = next);
  }

  notify(message: string, group: string) {
    this.signalr.SendNotification(message, group);
  }

}
