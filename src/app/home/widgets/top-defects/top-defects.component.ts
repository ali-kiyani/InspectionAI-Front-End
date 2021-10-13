import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { HomeServiceProxy } from '@shared/service-proxies/service-proxies';
import { filter } from 'lodash';
import { duration } from 'moment';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-top-defects',
  templateUrl: './top-defects.component.html',
  styleUrls: ['./top-defects.component.css']
})
export class TopDefectsComponent extends AppComponentBase implements OnInit {

  optionDonut = {
    chart: {
        type: 'donut',
        height: 375
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: '70%',
        }
     }
    },
    series: [21, 23, 19, 14],
    labels: ['Clothing', 'Food Products', 'Electronics', 'Kitchen Utility'],
    legend: {
      position: 'bottom',
    }
  }

  chart

  constructor(injector: Injector, private _dataSharingSerivce: DataSharingServiceProxies, private _homeService: HomeServiceProxy) {
    super(injector)
   }

  ngOnInit(): void {
    this._dataSharingSerivce.filterDetailedDashboard.subscribe(filter => {
      if (filter.duration === null || filter.stage === 0) {
        return
      } else {
          if (this.chart !== null && this.chart !== undefined) {
            this.chart.destroy()
          }
      }
      this._homeService.getDefectiveRatio(filter.duration, filter.product, filter.stage, 0)
      .subscribe(result => {
        this.optionDonut.labels = result.names
        this.optionDonut.series = result.count
        this.chart = renderCharts("#topdefects", this.optionDonut);
      })
    })
  }

}
