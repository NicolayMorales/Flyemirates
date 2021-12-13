import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VuelosModelo } from '../modelos/vuelos.model';
import { SeguridadService } from './seguridad.service';
@Injectable({
  providedIn: 'root'
})
export class VuelosService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { this.token = this.seguridadService.getToken(); }
  
url = "http://localhost:3000"
  token: string = ''
//CREAR VUELOS
store(vuelo: VuelosModelo): Observable<VuelosModelo> {
      return this.http.post<VuelosModelo>(`${this.url}/vuelos`, {
    //id: vuelo.id,
        fecha_inicio: vuelo.fecha_inicio,
        hora_inicio: vuelo.hora_inicio,
        fecha_fin: vuelo.fecha_fin,
        hora_fin: vuelo.hora_fin,      
        asientos_vendidos: vuelo.asientos_vendidos,
        nombre_piloto: vuelo.nombre_piloto,
        ruta:vuelo.ruta,
        
      },{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
      }

//Listar Vuelos
getAll(): Observable<VuelosModelo[]>{
return this.http.get<VuelosModelo[]>(`${this.url}/vuelos`, {
  headers: new HttpHeaders({
    "Authorization": `Bearer ${this.token}`
  })
})
}

//Actualizar un Vuelos
update(vuelo: VuelosModelo): Observable<VuelosModelo> {
return this.http.patch<VuelosModelo>(`${this.url}/vuelos/${vuelo.id}`, {
  //id: vuelo.id,
        fecha_inicio: vuelo.fecha_inicio,
        hora_inicio: vuelo.hora_inicio,
        fecha_fin: vuelo.fecha_fin,
        hora_fin: vuelo.hora_fin,      
        asientos_vendidos: vuelo.asientos_vendidos,
        nombre_piloto: vuelo.nombre_piloto,
        ruta:vuelo.ruta,
        
}, {
  headers: new HttpHeaders({
    "Authorization": `Bearer ${this.token}`
  })
});
}
//Eliminar un Vuelos
delete(id: string): Observable<VuelosModelo[]>{
return this.http.delete<VuelosModelo[]>(`${this.url}/vuelos/${id}`, {
headers: new HttpHeaders({
  "Authorization": `Bearer ${this.token}`
})
})
}
//Consultar un Usuario
getWithId(id: string): Observable<VuelosModelo>{
  return this.http.get<VuelosModelo>(`${this.url}/vuelos/${id}`,{
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
}


