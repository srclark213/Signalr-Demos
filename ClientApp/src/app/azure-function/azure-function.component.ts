import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../settings';

@Component({
  selector: 'app-azure-function',
  templateUrl: './azure-function.component.html'
})
export class AzureFunctionComponent implements OnInit {

  constructor(private $http: HttpClient) { }

  ngOnInit() {
  }

  triggerFunction() {
    this.$http.get(config.functionUrl).subscribe();
  }

}
