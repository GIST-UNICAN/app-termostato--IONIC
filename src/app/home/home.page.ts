import { ObjetoTemperatura, ObjetoFuncionamiento } from './../interfaces/interfaces';
import { RestserviceService } from './../services/restservice.service';
import { Component, OnInit, ElementRef,ViewChild  } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { formatDate } from "@angular/common";
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild("lineCanvas",{static:true}) barCanvas: ElementRef;
  private lineaTemp: Chart;

  fecha: string = new Date().toISOString()
  format = 'yyyy-MM-dd';
  locale = 'en-US';
  objeto_temperatura: ObjetoTemperatura;
  onjeto_extra: ObjetoFuncionamiento;
  horas: Array<string> = [];
  temperaturas: Array<Number> = [];
  deseadas: Array<Number> = [];
  estados: Array<Number> = [];
  externas: Array<Number> = [];

  constructor(private datos: RestserviceService) {
    
  }
ngOnInit() {
  this.onClick()
}
abrirDatePicker(){
  
}

onClick(){
  this.datos.getData(formatDate(this.fecha,this.format,this.locale)).subscribe(resp=>{
    this.objeto_temperatura=resp;
    console.log(this.objeto_temperatura)
    this.horas=[]
    this.deseadas=[]
    this.estados=[]
    this.temperaturas=[]
    this.externas=[]
    this.objeto_temperatura.forEach(element => {

      this.horas.push(element.fecha)
      this.temperaturas.push(element.temperatura)
      this.deseadas.push(element.deseada)
      this.estados.push(element.estado*5)
      this.externas.push(element.externa)
    });
    this.cargarTemperaturas()
  })
}

cargarTemperaturas(){
  console.log(this.horas)
  this.lineaTemp = new Chart(this.barCanvas.nativeElement, {
    type: "line",
    data: {
      labels: this.horas,
      datasets: [
        {
          label: "Temperatura",
          data: this.temperaturas,
          borderWidth: 2,
          borderColor: 'red',
          radius:0,
          backgroundColor: 'rgba(0, 0, 0, 0.0)'
        },
        {
          label: "Deseadas",
          data: this.deseadas,
          borderWidth: 2,
          borderColor: 'blue',
          radius: 0,
          backgroundColor:  'rgba(0, 0, 0, 0.0)'
        },
        {
          label: "Estado",
          data: this.estados,
          borderWidth: 1,
          borderColor: 'black',
          radius: 0,
          backgroundColor:  'black'
        }
        ,
        {
          label: "Externa",
          data: this.estados,
          borderWidth: 1,
          borderColor: 'green',
          radius: 0,
          backgroundColor:  'rgba(0, 0, 0, 0.0)'
        }
      ]
    },
    options: {
      
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}
}
