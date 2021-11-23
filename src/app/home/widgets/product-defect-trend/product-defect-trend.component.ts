import { Component, OnInit } from '@angular/core';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { OverviewDashboardServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

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
      data: []
    }
  ],
    xaxis: {
      categories: [],
      labels: {
        formatter: function (value: Date, timestamp) {
          if (value) {
            return moment(value).format('DD-MM-YY')
          }
        }, 
      },
      title: {
        text: 'Duration',
        style: {
          color: '#4f4f4f',
          fontSize: '13px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-title',
        }
      }
    },
    yaxis: {
      title: {
        text: 'Count',
        style: {
          color: '#4f4f4f',
          fontSize: '13px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-title',
        }
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

  constructor(private _dataSharingSerivce: DataSharingServiceProxies, private _homeService: OverviewDashboardServiceProxy) { }

  ngOnInit(): void {
    this._dataSharingSerivce.filterOverviewDashboard.subscribe(filter => {
      this._homeService.getProductDefectTrend(filter.duration)
      .subscribe(result => {
        this.optionsArea.series = []
        this.optionsArea.series.push({name: 'All', data: result.all})
        result.data.forEach(x => this.optionsArea.series.push({name: x.name, data: x.data}))
        this.optionsArea.xaxis.categories = result.labels
        if (this.chart === null || this.chart === undefined) {
          this.chart = renderCharts('#productdefecttrend', this.optionsArea)
        } else {
          this.chart.updateOptions({
            xaxis: {
              categories: result.labels,
              labels: {
                formatter: function (value: Date, timestamp) {
                  if (value) {
                    return moment(value).format('DD-MM-YY')
                  }
                }, 
              },
              title: {
                text: 'Duration',
                style: {
                  color: '#4f4f4f',
                  fontSize: '13px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  cssClass: 'apexcharts-xaxis-title',
                }
              }
            },
            series: this.optionsArea.series
          })
        }
        this.optionsArea.series.forEach(x => {
          if (x.name !== 'All') {
            //chart.toggleSeries(x.name)
          }
        })
      });
    })
  }

}
