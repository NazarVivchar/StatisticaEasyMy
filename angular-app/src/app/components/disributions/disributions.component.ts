import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {ApiService} from '../../APIs/api.service';
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-disributions',
  templateUrl: './disributions.component.html',
  styleUrls: ['./disributions.component.css'],
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

export class DisributionsComponent implements OnInit {

  uploader: FileUploader = new FileUploader(
    {
      url: 'http://127.0.0.1:8000/exp_ma_info/', removeAfterUpload: false, autoUpload: true
       }
    );
  visible = false;
  visible1 = false;
  visible2 = false;
  visible4 = true;
  hover1: boolean;
  hover2: boolean;
  distributions = new Array(9);
  selectedValue: any;
  n: number;
  wait = true;
  valueToSend1: number;
  valueToSend2: number;
  valueToSend3: number;
   info:any[];
    Highcharts = Highcharts;
    array: string = "";
    array_reg: string = "";
    updateFlag:boolean;
    points_reg: number[][] = [];
    points: number[][] = [];

    optFromInputString: string;
    chartOptions: Highcharts.Options;

   distributiosForBackend = ["bernoulli", "anglit", "arcsine", "dweibull", "norm", "triang", "wald", "uniform", 'expon'];

  constructor(private api: ApiService, private router: Router) {
    this.distributions[0] = 'Bernoulli';
    this.selectedValue = this.distributions[0];
    this.distributions[1] = 'Anglit';
    this.distributions[2] = 'Arcsine';
    this.distributions[3] = 'Double Weibull';
    this.distributions[4] = 'Normal';
    this.distributions[5] = 'Triangular';
    this.distributions[6] = 'Wald';
    this.distributions[7] = 'Uniform';

    this.distributions[8] = 'Exponential';


  }




  ngOnInit() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.visible = true;
      this.visible1 = true;
      this.visible4 = true;
    }, 10);
  }

  changeElement() {
    this.visible1 = !this.visible1;
    this.visible2 = !this.visible2;
  }

  submit1() {
    const data = {
      distribution_type: this.selectedValue, n: this.n
  };
    let jsonObj = JSON.stringify(data);
    console.log(jsonObj);
    this.api.sendDistributionData(jsonObj).subscribe(()=>{this.wait=false; });

  }
  submit2() {
     let httpParams = new HttpParams();
if(this.selectedValue==='Uniform') {
  httpParams = httpParams
    .set('high', this.valueToSend1.toString())
    .set('low', this.valueToSend2.toString());
}
else if(this.selectedValue==='Double Weibull')
{
  httpParams = httpParams
    .set('location', this.valueToSend1.toString())
    .set('scale', this.valueToSend2.toString())
    .set('c', this.valueToSend3.toString());
}
else if(this.selectedValue==='Bernoulli')
{
  httpParams = httpParams
    .set('probability', this.valueToSend1.toString())
}
else {
  httpParams = httpParams
    .set('location', this.valueToSend1.toString())
    .set('scale', this.valueToSend2.toString())

}
console.log(httpParams.keys());
this.api.sendDistributionData(httpParams).subscribe((data)=>{
              this.info = data;

              this.updateFlag = false;
              this.points = [];
              this.points_reg = [];
              this.array = "";
              this.array_reg = "";

              let chart_x:number[]  = this.info[0].result[1];
              let chart_y:number[] = this.info[0].result[2];
              console.log(chart_x);
               console.log(chart_y);
              for(let i in chart_x)
              {
                this.points.push([chart_x[i],chart_y[i]]);

              }


              for (let i of this.points){
                this.array += '['+i.join()+'],';
              }

              this.updateFlag = true;

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
});
  }
}
// <div  [hidden]="wait" class="d-flex flex-column align-items-center justify-content-around" >
// //         <div *ngIf="selectedValue != 'Bernoulli' && selectedValue != 'Uniform'" class="d-flex flex-column align-items-center justify-content-around">
// //         <label for="location1">Location</label>
// //         <input [(ngModel)]="valueToSend1" id="location1" type="number" >
// //         <label for="scale">Scale</label>
// //         <input [(ngModel)]="valueToSend2" id="scale" type="number" >
// //         </div>
// //
// //         <div *ngIf="selectedValue === 'Bernoulli'" class="d-flex flex-column align-items-center justify-content-around" >
// //         <label [(ngModel)]="valueToSend1" for="probability">C</label>
// //         <input [(ngModel)]="valueToSend2" id="probability" type="number" >
// //         </div>
// //         <div *ngIf="selectedValue === 'Double Weibull'" class="d-flex flex-column align-items-center justify-content-around" >
// //         <label for="c">C</label>
// //         <input [(ngModel)]="valueToSend3" id="c" type="number" >
// //         </div>
// //         
