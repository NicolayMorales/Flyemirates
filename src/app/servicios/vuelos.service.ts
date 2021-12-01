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
store(vuelos: VuelosModelo): Observable<VuelosModelo> {
  return this.http.post<VuelosModelo>(`${this.url}/vuelos`, {
    id: vuelos.id,
        fecha_inicio: vuelos.fecha_inicio,
        hora_inicio: vuelos.hora_inicio,
        fecha_fin: vuelos.fecha_fin,
        hora_fin: vuelos.hora_fin,      
        asientos_vendidos: vuelos.asientos_vendidos,
        nombre_piloto: vuelos.nombre_piloto,
        ruta:vuelos.ruta,
        
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
update(vuelos: VuelosModelo): Observable<VuelosModelo> {
return this.http.put<VuelosModelo>(`${this.url}/vuelos/${vuelos.id}`, {
  id: vuelos.id,
        fecha_inicio: vuelos.fecha_inicio,
        hora_inicio: vuelos.hora_inicio,
        fecha_fin: vuelos.fecha_fin,
        hora_fin: vuelos.hora_fin,      
        asientos_vendidos: vuelos.asientos_vendidos,
        nombre_piloto: vuelos.nombre_piloto,
        ruta:vuelos.ruta,
        
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
//Consultar un Vuelos
getWithId(id: string): Observable<VuelosModelo>{
return this.http.get<VuelosModelo>(`${this.url}/vuelos/${id}`,{
headers: new HttpHeaders({
  "Authorization": `Bearer ${this.token}`
})
})
}

}


