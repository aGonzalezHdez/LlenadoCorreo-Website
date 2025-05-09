export interface Consulta {
  id: number;
  fechaLlegada: string;
  horaLlegada: string;
  correoCliente: string;
  tituloCorreo: string;
  partidas: number;
  fechaCierre: string;
  horaCierre: string;
  diasRespuesta: number;
  referencia: string;
  razonSocial: string;
  clienteId: number;
  comentariosId: number;
  atendidoPorId: number;
}
