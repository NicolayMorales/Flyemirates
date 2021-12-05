import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutasModelo } from 'src/app/modelos/rutas.model';
import { RutasService } from 'src/app/servicios/rutas.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutasService: RutasService,
    private router: Router) { }
    fgValidacion = this.fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      tiempo_estimado: ['', [Validators.required]],
        
      });
  
  ngOnInit(): void {
  }
  store(){
    let rutas = new RutasModelo();
    rutas.origen = this.fgValidacion.controls["origen"].value;
    rutas.destino = this.fgValidacion.controls["destino"].value;
    rutas.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value;
    this.rutasService.store(rutas).subscribe((data: RutasModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
}
