import { Component, OnInit } from '@angular/core';
import { RutasModelo } from 'src/app/modelos/rutas.model';
import { RutasService } from 'src/app/servicios/rutas.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private rutasService: RutasService) { }
  listado: RutasModelo[] = []
   //Metodo para traer info y eliminar
  ngOnInit(): void { this.getAll()
  }


  getAll(){
    this.rutasService.getAll().subscribe((data: RutasModelo[]) => {
      this.listado = data
      console.log(data)
    })
  }
 
   delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Acpetar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rutasService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }

  
}
