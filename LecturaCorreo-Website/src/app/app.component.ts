import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { MainComponent } from './main/main.component';
import {ClienteComponent} from './cliente/cliente.component';
import {ComentarioComponent} from './comentario/comentario.component';
import {ConsultaComponent} from './consulta/consulta.component';
import {EjecutivoComponent} from './ejecutivo/ejecutivo.component';
import {InicioComponent} from './inicio/inicio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet,
    MainComponent,
    ClienteComponent,
    ComentarioComponent,
    ConsultaComponent,
    EjecutivoComponent,
    InicioComponent],
  standalone: true
})

export class AppComponent {
  title = 'LecturaCorreo-Website';
}
