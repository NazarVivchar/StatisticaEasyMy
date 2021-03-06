import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';
import {RegChartComponent} from './components/reg-chart/reg-chart.component';
import {RegDnnComponent} from './components/reg-dnn/reg-dnn.component';
import {PolynRegComponent} from "./components/polyn-reg/polyn-reg.component";
import {LogRegComponent} from "./components/log-reg/log-reg.component";
import {MovAvgComponent} from "./components/mov-avg/mov-avg.component";
import {ExpMovAvgComponent} from "./components/exp-mov-avg/exp-mov-avg.component";
import {WeightMovAvgComponent} from "./components/weight-mov-avg/weight-mov-avg.component";
import {RunMovAvgComponent} from "./components/run-mov-avg/run-mov-avg.component";
import {DisributionsComponent} from "./components/disributions/disributions.component";
import {HClasterComponent} from "./components/h-claster/h-claster.component";
import {KMeansComponent} from "./components/kmeans/kmeans.component";
import {TSneComponent} from "./components/tsne/tsne.component";
import {KalmanComponent} from "./components/kalman/kalman.component";
import {TreeComponent} from "./components/tree/tree.component";
import {SVMComponent} from "./components/svm/svm.component";
import {SGDComponent} from "./components/sgd/sgd.component";
import {GeneralComponent} from "./components/general/general.component";

const routes: Routes = [
  {path:'', component:MainPageComponent},
  {path:'regression', component:RegChartComponent},
  {path: 'dnn', component: RegDnnComponent},
  {path: 'polynomial-regression', component: PolynRegComponent},
  {path: 'logistic-regression', component: LogRegComponent},
  {path: 'simple-moving-averages', component: MovAvgComponent},
  {path: 'exponential-moving-averages', component: ExpMovAvgComponent},
  {path: 'weighted-moving-averages', component: WeightMovAvgComponent},
  {path: 'running-moving-averages', component: RunMovAvgComponent},
  {path: 'distributions', component: DisributionsComponent},
  {path: 'h-cluster', component: HClasterComponent},
  {path: 'k-means', component: KMeansComponent},
  {path: 't-sne', component: TSneComponent},
  {path: 'tree', component: TreeComponent},
  {path: 'svm', component: SVMComponent},
  {path: 'sgd', component: SGDComponent},
  {path: 'kalmans-filter', component: KalmanComponent},
  {path: 'general', component: GeneralComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
