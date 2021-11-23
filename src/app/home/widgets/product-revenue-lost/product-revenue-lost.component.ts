import { Component, OnInit } from '@angular/core';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { OverviewDashboardServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-product-revenue-lost',
  templateUrl: './product-revenue-lost.component.html',
  styleUrls: ['./product-revenue-lost.component.css']
})
export class ProductRevenueLostComponent implements OnInit {

  optionsArea = {
    chart: {
      height: 380,
      type: 'area',
      stacked: false,
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
        name: "",
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
        text: 'Loss x100',
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

  constructor(private _homeService: OverviewDashboardServiceProxy, private _dataSharingSerivce: DataSharingServiceProxies) { }

  ngOnInit(): void {
    this._dataSharingSerivce.filterOverviewDashboard.subscribe(filter => {
      this._homeService.getProductRevenueLoss(filter.duration)
      .subscribe(result => {
        this.optionsArea.xaxis.categories = result.labels
        this.optionsArea.series = []
        this.optionsArea.series.push({name: 'All', data: result.all})
        result.data.forEach(x => this.optionsArea.series.push({name: x.name, data: x.data}))
        if (this.chart === null || this.chart === undefined) {
          this.chart = renderCharts('#productrevenuelost', this.optionsArea)
        } else {
          this.chart.updateOptions({
            series: this.optionsArea.series,
          xaxis: {
            categories: this.optionsArea.xaxis.categories,
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
          }
          })
        }
        this.optionsArea.series.forEach(x => {
          if (x.name !== 'All') {
            //chart.hideSeries(x.name)
          }
        })
      });
    })
  }

}
