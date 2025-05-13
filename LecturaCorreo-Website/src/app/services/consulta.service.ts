import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Consulta} from '../models/consulta.model';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = "";
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/Consultas`;
  }

  // Obtener todos los consultas
  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}`);
  }

  // Obtener una consulta por ID
  getConsultaByID(id: number): Observable<any> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva consulta
  createConsulta(consulta: Consulta): Observable<any> {
    return this.http.post(`${this.apiUrl}`, consulta);
  }

  // Actualizar una consulta
  updateConsulta(consulta: Consulta): Observable<any> {
    return this.http.put(`${this.apiUrl}/${consulta.id}`, consulta);
  }

  // Eliminar una consulta
  deleteConsulta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
