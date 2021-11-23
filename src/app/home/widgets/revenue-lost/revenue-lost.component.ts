import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { DetailedDashboardServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-revenue-lost',
  templateUrl: './revenue-lost.component.html',
  styleUrls: ['./revenue-lost.component.css']
})
export class RevenueLostComponent implements OnInit, AfterViewInit {

  optionsLine = {
    chart: {
      height: 328,
      type: 'area',
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'straight',
      width: 3
    },
    //colors: ["#3F51B5", '#2196F3'],
    
    markers: {
      size: 4,
      strokeWidth: 0,
      hover: {
        size: 6
      }
    },
    grid: {
      show: true,
      padding: {
        bottom: 0
      }
    },
    series: [
      {
        name: "All",
        data: []
      }
    ],
    xaxis: {
      tooltip: {
        enabled: false
      },
      categories: [],
      labels: {
        formatter: function (value: any, timestamp) {
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
        text: 'Loss x100 Rs.',
        style: {
          color: '#4f4f4f',
          fontSize: '13px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-title',
        }
      }
    },
    legend: {
      position: 'bottom'
    }
  }

  chart

  constructor(private _homeService: DetailedDashboardServiceProxy, private _dataSharingSerivce: DataSharingServiceProxies) { }

  ngAfterViewInit(): void {
    this._dataSharingSerivce.filterDetailedDashboard.subscribe(filter => {
      if (filter.product === 0 || filter.stage === 0) {
        return
      }
      this._homeService.getRevenueLoss(filter.duration, filter.product, filter.stage)
      .subscribe(result => {
        this.optionsLine.xaxis.categories = result.labels
        this.optionsLine.series = []
        result.all.forEach(x => x = x / 100)
        this.optionsLine.series.push({name: 'All', data: result.all})
        for (let i = 0; result.data.length; i++) {
          result.data[i].data.forEach(x => x = x / 100)
        }
        result.data.forEach(x => this.optionsLine.series.push({name: x.name, data: x.data}))
        if (this.chart === null || this.chart === undefined) {
          this.chart = renderCharts("#revenuelost", this.optionsLine);
        } else {
          this.chart.updateOptions({
            series: this.optionsLine.series,
            xaxis: {
              tooltip: {
                enabled: false
              },
              categories: this.optionsLine.xaxis.categories,
              labels: {
                formatter: function (value: any, timestamp) {
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
        this.optionsLine.series.forEach(x => {
          if (x.name !== 'All') {
            //chart.hideSeries(x.name)
          }
        })
      });
    })
  }
  ngAfterViewChecked(): void {
  }

  ngOnInit(): void {

  }

}
