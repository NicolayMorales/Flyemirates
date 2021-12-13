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
    private seguridadService: SeguridadService) {
   this.token = this.seguridadService.getToken(); }
  
url = "http://localhost:3000"
  token: string = ''
  //CREAR AEROPUERTO
      store(aeropuerto: AeropuertosModelo): Observable<AeropuertosModelo> {
      return this.http.post<AeropuertosModelo>(`${this.url}/aeropuertos`, {
      nombre: aeropuerto.nombre,
      ciudad: aeropuerto.ciudad,
      pais: aeropuerto.pais,
      coordx: aeropuerto.coordx,
      coordy: aeropuerto.coordy,
      siglas: aeropuerto.siglas,
      tipo: aeropuerto.tipo

    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
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
   update(aeropuerto: AeropuertosModelo): Observable<AeropuertosModelo> {
    return this.http.patch<AeropuertosModelo>(`${this.url}/aeropuertos/${aeropuerto.id}`, {
        nombre: aeropuerto.nombre,
        ciudad: aeropuerto.ciudad,
        pais: aeropuerto.pais,
        coordx: aeropuerto.coordx,
        coordy: aeropuerto.coordy,
        siglas: aeropuerto.siglas,
        tipo: aeropuerto.tipo
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