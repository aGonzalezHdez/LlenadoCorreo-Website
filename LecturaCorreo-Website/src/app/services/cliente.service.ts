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
    this.apiUrl = `${this.configService.getApiBaseUrl()}/Cliente`;
  }

  // Obtener todos los clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  // Obtener un cliente por ID
  getClienteByID(id: number): Observable<any> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo cliente
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}`, cliente);
  }

  // Actualizar un cliente
  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  // Eliminar un cliente
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
