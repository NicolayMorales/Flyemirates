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
  store(ruta: RutasModelo): Observable<RutasModelo> {
    return this.http.post<RutasModelo>(`${this.url}/rutas`, {
      id: ruta.id,
      origen: ruta.origen,
      destino: ruta.destino,
      tiempo_estimado: ruta.tiempo_estimado
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
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
update(ruta: RutasModelo): Observable<RutasModelo> {
  return this.http.patch<RutasModelo>(`${this.url}/rutas/${ruta.id}`, {
      //id: ruta.id,
      origen: ruta.origen,
      destino: ruta.destino,
      tiempo_estimado: ruta.tiempo_estimado

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
