import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { ObjetoTemperatura } from '../interfaces/interfaces';

const headers = new HttpHeaders({
  'Accept': 'application/json, text/plain',
  'Content-Type': 'application/json'

});
@Injectable({
  providedIn: 'root'
})
export class RestserviceService {
  url: string ='http://rampillas.synology.me:3000/termostato?dia='
  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){

    const query2 = this.url + query;
    console.log('peticion: ', query2)
    return this.http.get<any>(query2)
  }
  getData(dia:string ){
    return this.ejecutarQuery<ObjetoTemperatura>(dia)
  }

}


