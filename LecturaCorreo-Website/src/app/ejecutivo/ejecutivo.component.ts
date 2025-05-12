import {Component, OnInit} from '@angular/core';
import {Ejecutivo} from '../models/ejecutivo.model';
import {EjecutivoService} from '../services/ejecutivo.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-ejecutivo',
  standalone: true,
  templateUrl: './ejecutivo.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrl: './ejecutivo.component.css'
})
export class EjecutivoComponent implements OnInit{
  ejecutivos: Ejecutivo[] = [];
  nuevoEjecutivo : Ejecutivo = { id: 0, nombre: '' ,idEmpleado : '000000'};
  editandoId: number | null = null; // ✅ ID del ejecutivo que está en edición
  private ejecutivoOriginal: Ejecutivo | null = null; // ✅ Guarda el valor original

  constructor(private ejecutivoService: EjecutivoService) {}
  ngOnInit(): void {
    this.obtenerEjecutivo();
  }

  obtenerEjecutivo(): void {
    this.ejecutivoService.getEjecutivos().subscribe((data) => {
      this.ejecutivos = data;
    });
  }

  agregarEjecutivo(): void {
    if (!this.nuevoEjecutivo.nombre.trim()) return;

    // ✅ Generamos un ID único antes de enviar el ejecutivo
    this.nuevoEjecutivo.id = this.ejecutivos.length + 1;

    this.ejecutivoService.createEjecutivo(this.nuevoEjecutivo).subscribe(() => {
      this.ejecutivos.push({ ...this.nuevoEjecutivo }); // Agregamos copia del ejecutivo
      this.nuevoEjecutivo.nombre = ''; // Limpiamos el formulario
    });

  }

  activarEdicion(ejecutivoId: number): void {
    const ejecutivo = this.ejecutivos.find(c => c.id === ejecutivoId);
    if (ejecutivo) {
      this.editandoId = ejecutivoId;
      this.ejecutivoOriginal = { ...ejecutivo }; // ✅ Guarda una copia del estado original
    }
  }



  guardarEdicion(ejecutivo: Ejecutivo): void {
    if (!ejecutivo.nombre.trim()) return; // ✅ Evita guardar nombres vacíos
    if (!ejecutivo.idEmpleado.trim()) return; // ✅ Evita guardar id vacíos

    // ✅ Solo llamar al API si el nombre cambió o el id del empleado
    let nameChange = this.ejecutivoOriginal && ejecutivo.nombre !== this.ejecutivoOriginal.nombre;
    let idEjecutivoChange = this.ejecutivoOriginal && ejecutivo.idEmpleado !== this.ejecutivoOriginal.idEmpleado;

    if (nameChange || idEjecutivoChange) {
      this.ejecutivoService.updateEjecutivo(ejecutivo).subscribe(() => {
        this.editandoId = null; // ✅ Desactiva edición después de guardar
        this.ejecutivoOriginal = null; // ✅ Limpia el estado original
      });
    } else {
      this.editandoId = null; // ✅ Solo desactiva la edición si no hubo cambios
      this.ejecutivoOriginal = null;
    }
  }


  cancelarEdicion(ejecutivo: Ejecutivo): void {
    if (this.ejecutivoOriginal) {
      ejecutivo.nombre = this.ejecutivoOriginal.nombre; // ✅ Restaura el valor original
      ejecutivo.idEmpleado = this.ejecutivoOriginal.idEmpleado;
    }
    this.editandoId = null; // ✅ Desactiva la edición
  }

  eliminarEjecutivo(ejecutivoId: number): void {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este ejecutivo?");

    if (!confirmacion) return; // ✅ Si el usuario cancela, no hacemos nada

    this.ejecutivoService.deleteEjecutivo(ejecutivoId).subscribe(() => {
      this.ejecutivos = this.ejecutivos.filter(ejecutivo => ejecutivo.id !== ejecutivoId); // ✅ Filtramos la lista
    });
  }
}
