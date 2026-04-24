import { Component } from '@angular/core';
import { Servicios } from './servicios/servicios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Servicios],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
}