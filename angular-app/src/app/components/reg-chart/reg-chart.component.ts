import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {ApiService} from '../../APIs/api.service';
import * as Highcharts from 'highcharts';
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reg-chart',
  templateUrl: './reg-chart.component.html',
  styleUrls: ['./reg-chart.component.css'],
  animations: [
    trigger(
      'enterAnimationLeft', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('2s ease-in', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1, position: 'absolute'}),
          animate('1s', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ]),
    trigger(
      'enterAnimationRight', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('2s ease-in', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1, position: 'absolute'}),
          animate('1s', style({transform: 'translateX(100%)', opacity: 0}),)
        ])
      ]),
    trigger(
      'enterAnimationTop', [
        transition(':enter', [
          style({transform: 'translateY(-100%)', opacity: 0}),
          animate('2s ease-in-out', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1, position: 'absolute'}),
          animate('1s', style({transform: 'translateY(-100%)', opacity: 0}))
        ])
      ]),
    trigger(
      'enterAnimationBottom', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('2s ease-in-out', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1, position: 'absolute'}),
          animate('1s', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ])
  ]
})
export class RegChartComponent implements OnInit {
  uploader: FileUploader = new FileUploader(
    { url: 'http://127.0.0.1:8000/regression_info/', removeAfterUpload: false, autoUpload: true
       }
    );
  visible: boolean;
  visible1: boolean;
  visible2: boolean;
  hover1: boolean;
  hover2: boolean;
    info:any[];
    Highcharts = Highcharts;
    array: string = "";
    array_reg: string = "";
    updateFlag:boolean;
    points_reg: number[][] = [];
    points: number[][] = [];
 
    optFromInputString: string;
    chartOptions: Highcharts.Options;

  constructor(private api: ApiService, private router: Router) {
    this.api = api;
    this.visible = false;
    this.visible1 = false;
    this.visible2 = false;
    this.hover1 = false;
    this.hover2 = false;
  }

  predict() {
      this.optFromInputString = `
    {
      "title": { "text": "Highcharts chart" },
      "xAxis": {"min":${this.points[0][0]}},
      "plotOptions": {
              "series": {
                   "marker": {
                      "enabled": false
                }
            }
             },
      "series":[{
        "data": [${this.array.slice(0,-1)}],
        "zones": [{
          "value": 1000,
          "dashStyle": "solid",
          "color": "black"
        }]
  
      },{
        "data": [${this.array_reg.slice(0,-1)}],
        "zones": [{
          "value": 1000,
          "dashStyle": "solid",
          "color": "red"
        }]
      }]
    }
    `;

    console.log(this.optFromInputString);
    this.chartOptions =
         JSON.parse(this.optFromInputString);


    this.updateFlag = true;

  }
      getReg(){
     this.getSomeInfo();
   }

   getSomeInfo() {
    this.api.getRegression().subscribe(
     (data: any[]) => {
           this.info = data;
          
            this.updateFlag = false;
            this.points = [];
            this.points_reg = [];
            this.array = "";
            this.array_reg = "";
           let chart_reg_x:number[] = this.info[0].chart_reg_x;
            let  chart_reg_y:number[] = this.info[1].chart_reg_y;
            let chart_x:number[]  = this.info[2].chart_x;
            let chart_y:number[] = this.info[3].chart_y;
            for(let i in chart_x)
            {
              this.points.push([chart_x[i],chart_y[i]]);
              
            }
            for(let i in chart_reg_x)
            {
              this.points_reg.push([chart_reg_x[i],chart_reg_y[i]]);
              
            }
            for (let i of this.points_reg){
              this.array_reg += '['+i.join()+'],';
            }
            
            for (let i of this.points){
              this.array += '['+i.join()+'],';
            }
       console.log(this.points_reg[0][0]);
            console.log(this.array_reg.slice(0,-1));
            let min = 
            this.optFromInputString = `
            {
              "title": { "text": "Highcharts chart" },
              "xAxis": {"min":${this.points[0][0]}},
              "plotOptions": {
              "series": {
                   "marker": {
                      "enabled": false
                }
            }
             },
              "series": [{
                "data": [${this.array.slice(0,-1)}],
                "zones": [{
                  "value": 1000,
                  "dashStyle": "solid",
                  "color": "black"
                }]
              }, {
                "data": []
              }]
            }
            `;
       console.log(this.optFromInputString);
            this.chartOptions = JSON.parse(this.optFromInputString);
           
     },
       error => {
       console.log(error);
     }
   );
 }
  ngOnInit() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.visible = true;
      this.visible1 = true;
    }, 10);

  }

  changeElement() {
    this.visible1 = !this.visible1;
    this.visible2 = !this.visible2;
  }


}
