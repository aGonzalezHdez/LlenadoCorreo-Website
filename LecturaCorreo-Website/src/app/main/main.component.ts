import { Component } from '@angular/core';
import {ClienteComponent} from '../cliente/cliente.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  imports: [
    ClienteComponent
  ],
  styleUrls: ['./main.component.css']
})
export class MainComponent {

}
