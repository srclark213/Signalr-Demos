import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../signalr.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.signalr.toasts.subscribe(next => this.onToast(next));
  }
  constructor(private toastr: ToastrService, private signalr: SignalrService) {    
  }

  notify(value: string) {
    this.signalr.SendNotification(value);
  }

  toast(value: string) {
    this.signalr.SendToast(value);
  }

  onToast(data: string) {
    if (data === null || data === "") return;

    this.toastr.success(data);
  }
}
