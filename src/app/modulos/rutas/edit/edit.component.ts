import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutasModelo } from 'src/app/modelos/rutas.model';
import { RutasService } from 'src/app/servicios/rutas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutasService: RutasService,
    private router: Router,
    private route: ActivatedRoute) { }
    
    fgValidacion = this.fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      tiempo_estimado: ['', [Validators.required]],
      
      });
   
      id: string=''

      buscarRegistro(id: string){
        this.rutasService.getWithId(id).subscribe((data: RutasModelo) => {
          console.log(data)
          this.fgValidacion.controls["origen"].setValue(data.origen)
          this.fgValidacion.controls["destino"].setValue(data.destino)
          this.fgValidacion.controls["tiempo_estimado"].setValue(data.tiempo_estimado)
          })
      }
    
    edit(){
        let ruta = new RutasModelo();
        ruta.origen= this.fgValidacion.controls["origen"].value;
        ruta.destino = this.fgValidacion.controls["destino"].value;
        ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value;
        
        this.rutasService.update(ruta).subscribe((data: RutasModelo)=> {
          Swal.fire('Editado Correctamente!', '', 'success')
          this.router.navigate(['/rutas/get']);
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
