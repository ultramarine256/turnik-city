import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-app';
  hello$ = this.http.get('http://localhost:3000/api');

  constructor(private http: HttpClient) {}

  ngOnInit() {}
}
