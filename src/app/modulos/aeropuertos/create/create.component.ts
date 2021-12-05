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
      ciudad: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      coordx: ['', [Validators.required]],
      coordy: ['', [Validators.required]],
      siglas: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      
      });
  ngOnInit(): void {
  }
  store(){
    let aeropuertos = new AeropuertosModelo();
    aeropuertos.ciudad = this.fgValidacion.controls["ciudad"].value;
    aeropuertos.pais = this.fgValidacion.controls["pais"].value;
    aeropuertos.coordx = this.fgValidacion.controls["coordx"].value;
    aeropuertos.coordy = this.fgValidacion.controls["coordy"].value;
    aeropuertos.siglas = this.fgValidacion.controls["siglas"].value;
    aeropuertos.tipo = this.fgValidacion.controls["tipo"].value;
    this.aeropuertosService.store(aeropuertos).subscribe((data: AeropuertosModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/aeropuertos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
