import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AeropuertosModelo } from '../modelos/aeropuertos.model';
import { SeguridadService } from './seguridad.service';
@Injectable({
  providedIn: 'root'
})
export class AeropuertosService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { this.token = this.seguridadService.getToken();}
  url = "http://localhost:3000"
  token: string = ''
//CREAR AEROPUERTO
store(aeropuertos: AeropuertosModelo): Observable<AeropuertosModelo> {
  return this.http.post<AeropuertosModelo>(`${this.url}/aeropuertos`, {
    id: aeropuertos.id,
    nombre: aeropuertos.nombre,
    ciudad: aeropuertos.ciudad,
    pais: aeropuertos.pais,
coord_x: aeropuertos.coord_x,
coord_y: aeropuertos.coord_y

  });
}

//Listar Aeropuertos
getAll(): Observable<AeropuertosModelo[]>{
return this.http.get<AeropuertosModelo[]>(`${this.url}/aeropuertos`, {
  headers: new HttpHeaders({
    "Authorization": `Bearer ${this.token}`
  })
})
}

//Actualizar un Aeropuertos
update(aeropuertos: AeropuertosModelo): Observable<AeropuertosModelo> {
return this.http.put<AeropuertosModelo>(`${this.url}/aeropuertos/${aeropuertos.id}`, {
  id: aeropuertos.id,
    nombre: aeropuertos.nombre,
    ciudad: aeropuertos.ciudad,
    pais: aeropuertos.pais,
coord_x: aeropuertos.coord_x,
coord_y: aeropuertos.coord_y
}, {
  headers: new HttpHeaders({
    "Authorization": `Bearer ${this.token}`
  })
});
}
//Eliminar un Aeropuertos
delete(id: string): Observable<AeropuertosModelo[]>{
return this.http.delete<AeropuertosModelo[]>(`${this.url}/aeropuertos/${id}`, {
headers: new HttpHeaders({
  "Authorization": `Bearer ${this.token}`
})
})
}
//Consultar un Aeropuertos
getWithId(id: string): Observable<AeropuertosModelo>{
return this.http.get<AeropuertosModelo>(`${this.url}/aeropuertos/${id}`,{
headers: new HttpHeaders({
  "Authorization": `Bearer ${this.token}`
})
})
}

}
