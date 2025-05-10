import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configData: any = null;

  constructor(private http: HttpClient, @Inject('CONFIG') private config: any) {
    this.configData = config; // Guardamos la configuración recibida de main.ts
  }

  getApiBaseUrl(): string {
    return this.configData?.apiBaseUrl || '';
  }
}
