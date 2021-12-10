import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AeropuertosModelo } from 'src/app/modelos/aeropuertos.model';
import { AeropuertosService } from 'src/app/servicios/aeropuertos.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

constructor(private fb: FormBuilder,
    private aeropuertosService: AeropuertosService,
    private router: Router,
    private route: ActivatedRoute) { }

 fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    coordx: ['', [Validators.required]],
    coordy: ['', [Validators.required]],
    siglas: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    });
 
    id: string=''

    ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

buscarRegistro(id: string){
        this.aeropuertosService.getWithId(id).subscribe((data: AeropuertosModelo) => {
          console.log(data)
          this.fgValidacion.controls["id"].setValue(id)
          this.fgValidacion.controls["nombre"].setValue(data.nombre)
          this.fgValidacion.controls["ciudad"].setValue(data.ciudad)
          this.fgValidacion.controls["pais"].setValue(data.pais)
          this.fgValidacion.controls["coordx"].setValue(data.coordx)
          this.fgValidacion.controls["coordy"].setValue(data.coordy)
          this.fgValidacion.controls["siglas"].setValue(data.siglas)
          this.fgValidacion.controls["tipo"].setValue(data.tipo)
        })
      }
       
      edit(){
        let aeropuerto = new AeropuertosModelo();
        aeropuerto.id = this.fgValidacion.controls["id"].value;
        aeropuerto.nombre = this.fgValidacion.controls["nombre"].value;
        aeropuerto.ciudad= this.fgValidacion.controls["ciudad"].value;
        aeropuerto.pais = this.fgValidacion.controls["pais"].value;
        aeropuerto.coordx = this.fgValidacion.controls["coordx"].value;
        aeropuerto.coordy = this.fgValidacion.controls["coordy"].value;
        aeropuerto.siglas = this.fgValidacion.controls["siglas"].value;
        aeropuerto.tipo = this.fgValidacion.controls["tipo"].value; 
        
this.aeropuertosService.update(aeropuerto).subscribe((data: AeropuertosModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}