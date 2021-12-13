import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AeropuertosModelo } from 'src/app/modelos/aeropuertos.model';
import { AeropuertosService } from 'src/app/servicios/aeropuertos.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
 

  constructor(private fb: FormBuilder,
    private aeropuertosService: AeropuertosService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      nombre: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      coordx: ['', [Validators.required]],
      coordy: ['', [Validators.required]],
      siglas: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
      
      });

  ngOnInit(): void {
  }
  store(){
    let aeropuerto = new AeropuertosModelo();
    aeropuerto.nombre = this.fgValidacion.controls["nombre"].value;
    aeropuerto.ciudad = this.fgValidacion.controls["ciudad"].value;
    aeropuerto.pais = this.fgValidacion.controls["pais"].value;
    aeropuerto.coordx = this.fgValidacion.controls["coordx"].value;
    aeropuerto.coordy = this.fgValidacion.controls["coordy"].value;
    aeropuerto.siglas = this.fgValidacion.controls["siglas"].value;
    aeropuerto.tipo = this.fgValidacion.controls["tipo"].value;
   
    this.aeropuertosService.store(aeropuerto).subscribe((data: AeropuertosModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/aeropuertos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}
