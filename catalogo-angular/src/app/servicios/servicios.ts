import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule], // 👈 ESTA LÍNEA ES LA CLAVE
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class Servicios {

  servicios = [
    { nombre: "Curso Angular", descripcion: "Aprende Angular básico" },
    { nombre: "Curso JavaScript", descripcion: "JavaScript moderno" },
    { nombre: "Curso HTML y CSS", descripcion: "Bases del desarrollo web" }
  ];

}