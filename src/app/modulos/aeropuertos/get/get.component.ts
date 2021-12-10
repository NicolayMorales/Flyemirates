import { Component, OnInit } from '@angular/core';
import { AeropuertosModelo } from 'src/app/modelos/aeropuertos.model';
import { AeropuertosService } from 'src/app/servicios/aeropuertos.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

 constructor(private aeropuertosService: AeropuertosService) { }
  listado: AeropuertosModelo[] = []
   //Metodo para traer info y eliminar
  ngOnInit(): void {this.getAll()
  }    

getAll(){
   this.aeropuertosService.getAll().subscribe((data: AeropuertosModelo[]) => {
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
        this.aeropuertosService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }

  
}