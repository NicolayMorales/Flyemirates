import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VuelosModelo } from 'src/app/modelos/vuelos.model';
import { VuelosService } from 'src/app/servicios/vuelos.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private vuelosService: VuelosService,
    private router: Router) { }
    fgValidacion = this.fb.group({
      fecha_inicio: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      asientos_vendidos: ['', [Validators.required]],
      nombre_piloto: ['', [Validators.required]],
      ruta: ['', [Validators.required]],  
      });
  

  ngOnInit(): void {
  }
  store(){
    let vuelos = new VuelosModelo();
    vuelos.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value;
    vuelos.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    vuelos.fecha_fin = this.fgValidacion.controls["fecha_fin"].value;
    vuelos.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    vuelos.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value;
    vuelos.nombre_piloto = this.fgValidacion.controls["nombre_piloto"].value;
    vuelos.ruta = this.fgValidacion.controls["ruta"].value;
    this.vuelosService.store(vuelos).subscribe((data: VuelosModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/vuelos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
