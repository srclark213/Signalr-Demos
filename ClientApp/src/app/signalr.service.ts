import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  
  private _hubConnection: HubConnection;
  private _notifications: BehaviorSubject<List<string>> = new BehaviorSubject(List([]));
  private _toasts: BehaviorSubject<string> = new BehaviorSubject(null);
  private _group: BehaviorSubject<string> = new BehaviorSubject(null);

  public readonly notifications: Observable<List<string>> = this._notifications.asObservable();
  public readonly toasts: Observable<string> = this._toasts.asObservable();
  public readonly group: Observable<string> = this._group.asObservable();
  
  

  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('/hubs/notifications')
    .configureLogging(signalR.LogLevel.Information)
    .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    this.bindSignalREvents();
  }

  public SendNotification(message: string, group?: string) {
    if(group != null) {
      this._hubConnection.send('SendGroupNotification', message, group);
    }
    else {
      this._hubConnection.send('SendNotification', message);
    }
  }

  public SendToast(message: string, group?: string) {
    if(group != null) {
      this._hubConnection.send('SendGroupToast', message, group);
    }
    else {
      this._hubConnection.send('SendToast', message);
    }
  }

  private bindSignalREvents()
  {
    this._hubConnection.on('SendNotification', this.onReceiveNotification.bind(this));
    this._hubConnection.on('SendToast', this.onReceiveToast.bind(this));
    this._hubConnection.on('GroupAssigned', this.onReceiveGroupAssignment.bind(this));
  }

  private onReceiveToast(data: any) {
    this._toasts.next(data.toString());
  }

  private onReceiveNotification(data: any) {
    this._notifications.next(this._notifications.getValue().push(data.toString()));
  }

  private onReceiveGroupAssignment(data: any) {
    this._group.next(data.toString());
  }
}
