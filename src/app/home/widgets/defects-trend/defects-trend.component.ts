import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { DefectTrendDto, HomeServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-defects-trend',
  templateUrl: './defects-trend.component.html',
  styleUrls: ['./defects-trend.component.css']
})
export class DefectsTrendComponent implements OnInit, AfterViewChecked {

  chart
  trend: DefectTrendDto
  isLoaded = false;
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
      data: []
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

  constructor(private _homeService: HomeServiceProxy, private _dataSharingSerivce: DataSharingServiceProxies) {

   }
  ngAfterViewChecked(): void {

  }
  ngAfterViewInit(): void {
    this._dataSharingSerivce.filterDetailedDashboard.subscribe(filter => {
      if (filter.duration === null || filter.stage === 0) {
        return
      } else {
        if (this.chart !== null && this.chart !== undefined) {
          this.chart.destroy()
        }
      }
      this._homeService.getDefectTrend(filter.duration, filter.product, filter.stage, 0)
      .subscribe(result => {
        this.optionsArea.series = []
        this.optionsArea.series.push({name: 'All', data: result.all})
        result.data.forEach(x => this.optionsArea.series.push({name: x.name, data: x.data}))
        this.optionsArea.xaxis.categories = result.labels
        this.chart = renderCharts("#defectstrend", this.optionsArea);
        console.log('loaded with: ' ,filter.duration, filter.stage)
        this.optionsArea.series.forEach(x => {
          if (x.name !== 'All') {
            //chart.toggleSeries(x.name)
          }
        })
        this.isLoaded = true
      });
    })

   }

  ngOnInit(): void {

  }

}
