import { Component } from '@angular/core';
import {ClienteComponent} from '../cliente/cliente.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  imports: [
    ClienteComponent,
    RouterOutlet,
    RouterLink
  ],
  styleUrls: ['./main.component.css']
})
export class MainComponent {

}
