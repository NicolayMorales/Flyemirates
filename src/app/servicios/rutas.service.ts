import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RutasModelo } from '../modelos/rutas.model';
import { SeguridadService } from './seguridad.service';
@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {this.token = this.seguridadService.getToken(); }
    url = "http://localhost:3000"
    token: string = ''
  //CREAR RUTAS
  store(rutas: RutasModelo): Observable<RutasModelo> {
    return this.http.post<RutasModelo>(`${this.url}/rutas`, {
      id: rutas.id,
      origen: rutas.origen,
      destino: rutas.destino,
      tiempo_estimado: rutas.tiempo_estimado
    });
  }

//Listar Rutas
getAll(): Observable<RutasModelo[]>{
  return this.http.get<RutasModelo[]>(`${this.url}/rutas`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}

//Actualizar un Rutas
update(rutas: RutasModelo): Observable<RutasModelo> {
  return this.http.put<RutasModelo>(`${this.url}/rutas/${rutas.id}`, {
id: rutas.id,
      origen: rutas.origen,
      destino: rutas.destino,
      tiempo_estimado: rutas.tiempo_estimado

  }, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  });
}
//Eliminar un Rutas
delete(id: string): Observable<RutasModelo[]>{
return this.http.delete<RutasModelo[]>(`${this.url}/rutas/${id}`, {
  headers: new HttpHeaders({
    "Authorization": `Bearer ${this.token}`
  })
})
}
//Consultar un Rutas
getWithId(id: string): Observable<RutasModelo>{
return this.http.get<RutasModelo>(`${this.url}/rutas/${id}`,{
  headers: new HttpHeaders({
    "Authorization": `Bearer ${this.token}`
  })
})
}

  }
