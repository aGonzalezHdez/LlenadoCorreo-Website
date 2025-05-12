import {Component, OnInit} from '@angular/core';
import {ComentarioService} from '../services/comentario.service';
import {Comentario} from '../models/comentario.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-comentario',
  standalone: true,
  templateUrl: './comentario.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent implements OnInit {
  comentarios: Comentario[] = [];
  nuevoComentario : Comentario = { id: 0, descripcion: '' };
  editandoId: number | null = null; // ✅ ID del comentario que está en edición
  private comentarioOriginal: Comentario | null = null; // ✅ Guarda el valor original

  constructor(private comentarioService: ComentarioService) {}
  ngOnInit(): void {
    this.obtenerComentarios();
  }

  obtenerComentarios(): void {
    this.comentarioService.getComentarios().subscribe((data) => {
      this.comentarios = data;
    });
  }

  agregarComentario(): void {
    if (!this.nuevoComentario.descripcion.trim()) return;

    // ✅ Generamos un ID único antes de enviar el comentario
    this.nuevoComentario.id = this.comentarios.length + 1;

    this.comentarioService.createComentario(this.nuevoComentario).subscribe(() => {
      this.comentarios.push({ ...this.nuevoComentario }); // Agregamos copia del cliente
      this.nuevoComentario.descripcion = ''; // Limpiamos el formulario
    });

  }

  activarEdicion(clienteId: number): void {
    const cliente = this.comentarios.find(c => c.id === clienteId);
    if (cliente) {
      this.editandoId = clienteId;
      this.comentarioOriginal = { ...cliente }; // ✅ Guarda una copia del estado original
    }
  }



  guardarEdicion(comentario: Comentario): void {
    if (!comentario.descripcion.trim()) return; // ✅ Evita guardar descripciones vacías

    // ✅ Solo llamar al API si la descripcion cambió
    if (this.comentarioOriginal && comentario.descripcion !== this.comentarioOriginal.descripcion) {
      this.comentarioService.updateComentario(comentario).subscribe(() => {
        this.editandoId = null; // ✅ Desactiva edición después de guardar
        this.comentarioOriginal = null; // ✅ Limpia el estado original
      });
    } else {
      this.editandoId = null; // ✅ Solo desactiva la edición si no hubo cambios
      this.comentarioOriginal = null;
    }
  }


  cancelarEdicion(comentario: Comentario): void {
    if (this.comentarioOriginal) {
      comentario.descripcion = this.comentarioOriginal.descripcion; // ✅ Restaura el valor original
    }
    this.editandoId = null; // ✅ Desactiva la edición
  }

  eliminarComentario(comentarioId: number): void {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este comentario?");

    if (!confirmacion) return; // ✅ Si el usuario cancela, no hacemos nada

    this.comentarioService.deleteComentario(comentarioId).subscribe(() => {
      this.comentarios = this.comentarios.filter(comentario => comentario.id !== comentarioId); // ✅ Filtramos la lista
    });
  }
}
