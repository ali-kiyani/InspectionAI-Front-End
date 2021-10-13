import { Component, OnInit } from '@angular/core';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { HomeServiceProxy } from '@shared/service-proxies/service-proxies';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-product-defect-trend',
  templateUrl: './product-defect-trend.component.html',
  styleUrls: ['./product-defect-trend.component.css']
})
export class ProductDefectTrendComponent implements OnInit {

  optionsArea = {
    chart: {
      height: 328,
      type: 'area',
      stacked: false,
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      name: "All",
      data: [1567, 1412, 1345, 1167, 1478, 1599, 1665]
    },
    {
      name: "Axel",
      data: [566, 789, 245, 356, 490, 350, 278]
    },
    {
      name: "Shock Absorber",
      data: [398, 532, 456, 578, 634, 713, 760]
    },
    {
      name: "Seal",
      data: [603, 91, 644, 233, 354, 536, 627]
    }
  ],
    xaxis: {
      categories: [],
      labels: {
        formatter: function (value: Date, timestamp) {
          if (value) {
            let d = new Date(value)
            d.setDate(d.getDate() + 1)
            let time = d.toISOString().split('T')[0]
            return time
          }
        }, 
      }
    },
    tooltip: {
      followCursor: true
    },
    fill: {
      opacity: 1,
    },
  
  }

  chart

  constructor(private _dataSharingSerivce: DataSharingServiceProxies, private _homeService: HomeServiceProxy) { }

  ngOnInit(): void {
    this._dataSharingSerivce.filterOverviewDashboard.subscribe(filter => {
      if (filter.duration === null) {
        return
      } else {
        if (this.chart !== null && this.chart !== undefined) {
          this.chart.destroy()
        }
      }
      this._homeService.getProductDefectTrend(filter.duration)
      .subscribe(result => {
        this.optionsArea.series = []
        this.optionsArea.series.push({name: 'All', data: result.all})
        result.data.forEach(x => this.optionsArea.series.push({name: x.name, data: x.data}))
        this.optionsArea.xaxis.categories = result.labels
        this.chart = renderCharts('#productdefecttrend', this.optionsArea)
        this.optionsArea.series.forEach(x => {
          if (x.name !== 'All') {
            //chart.toggleSeries(x.name)
          }
        })
      });
    })
  }

}
