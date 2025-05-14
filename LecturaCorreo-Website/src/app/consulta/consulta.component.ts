import {Component, OnInit} from '@angular/core';
import {ConsultaService} from '../services/consulta.service';
import {Consulta} from '../models/consulta.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ClienteService} from '../services/cliente.service';
import {ComentarioService} from '../services/comentario.service';
import {EjecutivoService} from '../services/ejecutivo.service';
import {Cliente} from '../models/cliente.model';
import {Comentario} from '../models/comentario.model';
import {Ejecutivo} from '../models/ejecutivo.model';
import {CommandNames} from '@angular/cli/src/commands/command-config';

@Component({
  selector: 'app-consulta',
  standalone: true,
  templateUrl: './consulta.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent implements OnInit{
  consultaForm!: FormGroup;
  consultas: Consulta[] = [];
  clientes: Cliente[] = [];
  comentarios: Comentario[] = [];
  ejecutivos: Ejecutivo[] = [];

  nuevaConsulta : Consulta = { id: 0,
    fechaLlegada: '',
    horaLlegada: '',
    correoCliente: '',
    tituloCorreo: '',
    partidas: 0,
    fechaCierre: '',
    horaCierre: '',
    diasRespuesta: 0,
    referencia: '',
    razonSocial: '',
    clienteId: 1,
    comentariosId: 1,
    atendidoPorId: 1 };
  editandoConsulta = false; // ✅ Indica si estamos editando o creando una nueva consulta
  private consultaOriginal: Consulta | null = null; // ✅ Guarda el valor original

  clientesMap = new Map<number, string>();
  comentariosMap = new Map<number, string>();
  ejecutivosMap = new Map<number, string>();
  modalAbierto : boolean = false;


  constructor(private fb: FormBuilder,
              private consultaService: ConsultaService,
              private clienteService: ClienteService,
              private comentarioService: ComentarioService,
              private ejecutivoService: EjecutivoService) {}
  ngOnInit(): void {
    this.consultaForm = this.fb.group({
      id: [0],
      fechaLlegada: [''],
      horaLlegada: [''],
      correoCliente: [''],
      tituloCorreo: [''],
      partidas: [0],
      fechaCierre: [''],
      horaCierre: [''],
      diasRespuesta: [0],
      referencia: [''],
      razonSocial: [''],
      clienteId: [null],
      comentariosId: [null],
      atendidoPorId: [null]
    });

    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.consultaService.getConsultas().subscribe((data) => {
      this.consultas = data;
    });

    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
      data.forEach(cliente => this.clientesMap.set(cliente.id, cliente.nombre));
    });

    this.comentarioService.getComentarios().subscribe((data) => {
      this.comentarios = data;
      data.forEach(comentario => this.comentariosMap.set(comentario.id, comentario.descripcion));
    });

    this.ejecutivoService.getEjecutivos().subscribe((data) => {
      this.ejecutivos = data;
      data.forEach(ejecutivo => this.ejecutivosMap.set(ejecutivo.id, ejecutivo.nombre));

    });

  }

  agregarConsulta(): void {
    if (this.consultaForm.valid) {

      const consultaProcesada = {
        ...this.nuevaConsulta,
        diasRespuesta: Number(this.nuevaConsulta.diasRespuesta),
        partidas: Number(this.nuevaConsulta.partidas),
        clienteId: Number(this.nuevaConsulta.clienteId),
        comentariosId: Number(this.nuevaConsulta.comentariosId),
        atendidoPorId: Number(this.nuevaConsulta.atendidoPorId)
      };

      this.consultaService.createConsulta(consultaProcesada).subscribe(() => {
        alert('Consulta agregada correctamente!');
        this.consultas.push({ ...this.nuevaConsulta });
        this.consultaForm.reset();
        this.cerrarModal();
      });

    }
  }

  actualizarConsulta(): void {
    const consultaProcesada = {
      ...this.consultaForm.value,
      diasRespuesta: Number(this.nuevaConsulta.diasRespuesta),
      partidas: Number(this.nuevaConsulta.partidas),
      clienteId: Number(this.nuevaConsulta.clienteId),
      comentariosId: Number(this.nuevaConsulta.comentariosId),
      atendidoPorId: Number(this.nuevaConsulta.atendidoPorId)
    };

    this.consultaService.updateConsulta(consultaProcesada).subscribe(() => {
      alert('Consulta actualizada correctamente!');
      this.consultaForm.reset();
      this.modalAbierto = false;
      this.editandoConsulta = false; // ✅ Desactivamos el modo edición
      this.cargarConsultas(); // ✅ Recarga la tabla después de actualizar
    });
  }


  eliminarConsulta(consultasId: number): void {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar esta consulta?");

    if (!confirmacion) return; // ✅ Si el usuario cancela, no hacemos nada

    this.consultaService.deleteConsulta(consultasId).subscribe(() => {
      this.consultas = this.consultas.filter(consulta => consulta.id !== consultasId); // ✅ Filtramos la lista
    });
  }


  obtenerNombreCliente(clienteId: number): string {
    return this.clientesMap.get(clienteId) || "POR ASIGNAR";
  }

  obtenerComentario(comentariosId: number): string {
    return this.comentariosMap.get(comentariosId) || "SIN COMENTARIOS";
  }

  obtenerNombreEjecutivo(atendidoPorId: number): string {
    return this.ejecutivosMap.get(atendidoPorId) || "POR ASIGNAR";
  }

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.consultaForm.reset(); // ✅ Limpia todos los campos del formulario
    this.nuevaConsulta = { id: 0, // ✅ Asegura que la consulta nueva esté vacía
      fechaLlegada: '',
      horaLlegada: '',
      correoCliente: '',
      tituloCorreo: '',
      partidas: 0,
      fechaCierre: '',
      horaCierre: '',
      diasRespuesta: 0,
      referencia: '',
      razonSocial: '',
      clienteId: 1,
      comentariosId: 1,
      atendidoPorId: 1 };
    this.modalAbierto = false; // ✅ Cierra el modal
    this.editandoConsulta = false; // ✅ Reinicia el modo edición
  }


  editarConsulta(consulta: Consulta) : void {
    if (!consulta) return; // ✅ Si `consulta` es undefined, detenemos la función
    this.editandoConsulta = true; // ✅ Activamos el modo edición
    this.nuevaConsulta = { ...consulta }; // ✅ Clona los datos de la consulta seleccionada
    this.consultaForm.patchValue(this.nuevaConsulta); // ✅ Llena el formulario con los datos
    this.modalAbierto = true; // ✅ Abre el modal para edición

  }

  cargarConsultas(): void {
    this.consultaService.getConsultas().subscribe((data) => {
      this.consultas = data; // ✅ Actualiza la tabla con los datos nuevos
    });
  }

}
