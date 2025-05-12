import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comentario} from '../models/comentario.model';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = "";
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/Comentarios`;
  }

  // Obtener todos los comentarios
  getComentarios(): Observable<any> {
    return this.http.get<Comentario[]>(`${this.apiUrl}`);
  }

  // Obtener un comentario por ID
  getComentarioByID(id: number): Observable<any> {
    return this.http.get<Comentario>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo comentario
  createComentario(comentario: Comentario): Observable<any> {
    return this.http.post(`${this.apiUrl}`, comentario);
  }

  // Actualizar un comentario
  updateComentario(comentario: Comentario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${comentario.id}`, comentario);
  }

  // Eliminar un comentario
  deleteComentario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
