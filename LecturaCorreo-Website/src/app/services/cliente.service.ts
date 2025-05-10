import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cliente} from '../models/cliente.model';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = "";


  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/Clientes`;
  }

  // Obtener todos los clientes
  getClientes(): Observable<any> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  // Obtener un cliente por ID
  getClienteByID(id: number): Observable<any> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo cliente
  createCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cliente);
  }

  // Actualizar un cliente
  updateCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  // Eliminar un cliente
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
