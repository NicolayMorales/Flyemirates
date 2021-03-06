import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }
  listado: UsuarioModelo[] = []
  //Metodo para traer info y eliminar
  ngOnInit(): void { this.getAll()
  }

  
  getAll(){
    this.usuariosService.getAll().subscribe((data: UsuarioModelo[]) => {
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
        this.usuariosService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }

  
}
