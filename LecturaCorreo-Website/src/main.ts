import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/config.service';

fetch('assets/config.json')
  .then(response => response.json())
  .then(config => {
    bootstrapApplication(AppComponent, {
      providers: [
        provideHttpClient(),
        { provide: 'CONFIG', useValue: config },
        ConfigService // Aseguramos que el servicio esté disponible
      ]
    }).catch(err => console.error('Error al iniciar la aplicación:', err));
  })
  .catch(error => console.error('Error cargando la configuración:', error));
