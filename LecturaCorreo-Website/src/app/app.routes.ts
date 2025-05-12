import { Routes } from '@angular/router';
import {ClienteComponent} from './cliente/cliente.component';
import {ComentarioComponent} from './comentario/comentario.component';
import {ConsultaComponent} from './consulta/consulta.component';
import {EjecutivoComponent} from './ejecutivo/ejecutivo.component';
import {InicioComponent} from './inicio/inicio.component';

export const routes: Routes = [
  {path: '',component: InicioComponent},
  {path: 'clientes',component: ClienteComponent},
  {path: 'comentarios',component: ComentarioComponent},
  {path: 'consultas',component: ConsultaComponent},
  {path: 'ejecutivos',component: EjecutivoComponent}
];
