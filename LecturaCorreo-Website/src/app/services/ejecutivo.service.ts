import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ejecutivo} from '../models/ejecutivo.model';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EjecutivoService {
  private apiUrl = "";
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/Ejecutivo`;
  }

  // Obtener todos los ejecutivos
  getEjecutivos(): Observable<any> {
    return this.http.get<Ejecutivo[]>(`${this.apiUrl}`);
  }

  // Obtener un ejecutivo por ID
  getEjecutivoByID(id: number): Observable<any> {
    return this.http.get<Ejecutivo>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo ejecutivo
  createEjecutivo(ejecutivo: Ejecutivo): Observable<any> {
    return this.http.post(`${this.apiUrl}`, ejecutivo);
  }

  // Actualizar un ejecutivo
  updateEjecutivo(id: number, ejecutivo: Ejecutivo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ejecutivo);
  }

  // Eliminar un ejecutivo
  deleteEjecutivo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
