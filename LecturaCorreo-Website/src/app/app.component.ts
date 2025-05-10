import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './main/main.component';
import {ClienteComponent} from './cliente/cliente.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, MainComponent, ClienteComponent],
  standalone: true
})
export class AppComponent {
  title = 'LecturaCorreo-Website';
}
