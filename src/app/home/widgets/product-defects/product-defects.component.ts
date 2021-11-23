import { Component, Injector, OnInit } from '@angular/core';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { OverviewDashboardServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '../../../../shared/app-component-base';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-product-defects',
  templateUrl: './product-defects.component.html',
  styleUrls: ['./product-defects.component.css']
})
export class ProductDefectsComponent extends AppComponentBase implements OnInit {

  optionsBar = {
    chart: {
      height: 328,
      type: 'bar',
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        horizontal: true,
      },
    },
    series: [{
      name: '',
      data: []
    }
    ],
    xaxis: {
      categories: [],
    },
    fill: {
      opacity: 1
    },
  
  }

  chart

  constructor(injector: Injector, private _dataSharingSerivce: DataSharingServiceProxies, private _homeService: OverviewDashboardServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this._dataSharingSerivce.filterOverviewDashboard.subscribe(filter => {
      this._homeService.getProductDefectRatio(filter.duration)
      .subscribe(result => {
        this.optionsBar.xaxis.categories = result.name
        this.optionsBar.series = []
        this.optionsBar.series.push({name: 'GOOD', data: result.good})
        this.optionsBar.series.push({name: 'Defective', data: result.defects})
        if (this.chart === null || this.chart === undefined) {
        this.chart = renderCharts("#productsdefect", this.optionsBar);
        } else {
          this.chart.updateOptions({
            series: this.optionsBar.series,
            xaxis: {
              categories: this.optionsBar.xaxis.categories,
            }
          })
        }
      })
    })
}
}
