import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VuelosModelo } from 'src/app/modelos/vuelos.model';
import { VuelosService } from 'src/app/servicios/vuelos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private vuelosService: VuelosService,
    private router: Router,
    private route: ActivatedRoute) { }
    fgValidacion = this.fb.group({
    fecha_inicio: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    asientos_vendidos: ['', [Validators.required]],
    nombre_piloto: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
    });
 
    id: string=''

    buscarRegistro(id: string){
      this.vuelosService.getWithId(id).subscribe((data: VuelosModelo) => {
        console.log(data)
        this.fgValidacion.controls["fecha_inicio"].setValue(data.fecha_inicio)
        this.fgValidacion.controls["hora_inicio"].setValue(data.hora_inicio)
        this.fgValidacion.controls["fecha_fin"].setValue(data.fecha_fin)
        this.fgValidacion.controls["hora_fin"].setValue(data.hora_fin)
        this.fgValidacion.controls["asientos_vendidos"].setValue(data.asientos_vendidos)
        this.fgValidacion.controls["nombre_piloto"].setValue(data.nombre_piloto)
        this.fgValidacion.controls["ruta"].setValue(data.ruta)
      })
    }
  
  edit(){
      let vuelos = new VuelosModelo();
      vuelos.fecha_inicio= this.fgValidacion.controls["fecha_inicio"].value;
      vuelos.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
      vuelos.fecha_fin = this.fgValidacion.controls["fecha_fin"].value;
      vuelos.hora_fin = this.fgValidacion.controls["hora_fin"].value;
      vuelos.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value;
      vuelos.nombre_piloto = this.fgValidacion.controls["nombre_piloto"].value; 
      vuelos.ruta = this.fgValidacion.controls["ruta"].value;
      this.vuelosService.update(vuelos).subscribe((data: VuelosModelo)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/vuelos/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
    }
  
  ngOnInit(): void {this.id = this.route.snapshot.params["id"]
  this.buscarRegistro(this.id);
  }

}
