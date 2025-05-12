import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/config.service';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

fetch('assets/config.json')
  .then(response => response.json())
  .then(config => {
    bootstrapApplication(AppComponent, {
      providers: [
        provideHttpClient(),
        { provide: 'CONFIG', useValue: config },
        ConfigService, // ✅ Asegura que el servicio de configuración esté disponible
        provideRouter(routes) // ✅ Agregamos las rutas aquí
      ]
    }).catch(err => console.error('Error al iniciar la aplicación:', err));
  })
  .catch(error => console.error('Error cargando la configuración:', error));
