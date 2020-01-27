import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { ObjetoTemperatura, ObjetoFuncionamiento } from '../interfaces/interfaces';

const headers = new HttpHeaders({
  'Accept': 'application/json, text/plain',
  'Content-Type': 'application/json'

});
@Injectable({
  providedIn: 'root'
})
export class RestserviceService {
  url: string ='http://rampillas.synology.me:3000/'
  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string, servicio: string){

    const query2 = this.url +servicio+'?dia='+ query;
    console.log('peticion: ', query2)
    return this.http.get<T>(query2)
  }
  getData(dia:string ){
    return this.ejecutarQuery<ObjetoTemperatura>(dia,'termostato')
  }
  getextraData(dia:string ){
    return this.ejecutarQuery<ObjetoFuncionamiento>(dia,'termostatodata')
  }

}


