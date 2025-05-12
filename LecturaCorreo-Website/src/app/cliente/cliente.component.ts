import {Component, OnInit} from '@angular/core';
import {Cliente} from '../models/cliente.model';
import {ClienteService} from '../services/cliente.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  imports: [CommonModule,FormsModule]
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  nuevoCliente : Cliente = { id: 0, nombre: '' };
  editandoId: number | null = null; // ✅ ID del cliente que está en edición
  private clienteOriginal: Cliente | null = null; // ✅ Guarda el valor original

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  agregarCliente(): void {
    if (!this.nuevoCliente.nombre.trim()) return;

    // ✅ Generamos un ID único antes de enviar el cliente
    this.nuevoCliente.id = this.clientes.length + 1;

    this.clienteService.createCliente(this.nuevoCliente).subscribe(() => {
      this.clientes.push({ ...this.nuevoCliente }); // Agregamos copia del cliente
      this.nuevoCliente.nombre = ''; // Limpiamos el formulario
    });

  }

  activarEdicion(clienteId: number): void {
    const cliente = this.clientes.find(c => c.id === clienteId);
    if (cliente) {
      this.editandoId = clienteId;
      this.clienteOriginal = { ...cliente }; // ✅ Guarda una copia del estado original
    }
  }



  guardarEdicion(cliente: Cliente): void {
    if (!cliente.nombre.trim()) return; // ✅ Evita guardar nombres vacíos

    // ✅ Solo llamar al API si el nombre cambió
    if (this.clienteOriginal && cliente.nombre !== this.clienteOriginal.nombre) {
      this.clienteService.updateCliente(cliente).subscribe(() => {
        this.editandoId = null; // ✅ Desactiva edición después de guardar
        this.clienteOriginal = null; // ✅ Limpia el estado original
      });
    } else {
      this.editandoId = null; // ✅ Solo desactiva la edición si no hubo cambios
      this.clienteOriginal = null;
    }
  }


  cancelarEdicion(cliente: Cliente): void {
    if (this.clienteOriginal) {
      cliente.nombre = this.clienteOriginal.nombre; // ✅ Restaura el valor original
    }
    this.editandoId = null; // ✅ Desactiva la edición
  }

  eliminarCliente(clienteId: number): void {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este cliente?");

    if (!confirmacion) return; // ✅ Si el usuario cancela, no hacemos nada

    this.clienteService.deleteCliente(clienteId).subscribe(() => {
      this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId); // ✅ Filtramos la lista
    });
  }

}

