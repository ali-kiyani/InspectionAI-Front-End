import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { DetailedDashboardServiceProxy } from '@shared/service-proxies/service-proxies';
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
    series: [],
    labels: [],
    legend: {
      position: 'bottom',
    }
  }

  chart

  constructor(injector: Injector, private _dataSharingSerivce: DataSharingServiceProxies, private _homeService: DetailedDashboardServiceProxy) {
    super(injector)
   }

  ngOnInit(): void {
    this._dataSharingSerivce.filterDetailedDashboard.subscribe(filter => {
      if (filter.product === 0 || filter.stage === 0) {
        return
      }
      this._homeService.getDefectiveRatio(filter.duration, filter.product, filter.stage)
      .subscribe(result => {
        this.optionDonut.labels = result.names
        this.optionDonut.series = result.count
        if (this.chart === null || this.chart === undefined) {
          this.chart = renderCharts("#topdefects", this.optionDonut);
        } else {
          this.chart.updateOptions({
            series: this.optionDonut.series,
            labels: this.optionDonut.labels
          })
        }
      })
    })
  }

}
