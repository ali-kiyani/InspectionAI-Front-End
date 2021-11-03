import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { DetailedDashboardServiceProxy, OverviewDefectTrendDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-defects-trend',
  templateUrl: './defects-trend.component.html',
  styleUrls: ['./defects-trend.component.css']
})
export class DefectsTrendComponent implements OnInit, AfterViewChecked {

  chart
  trend: OverviewDefectTrendDto
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

  constructor(private _homeService: DetailedDashboardServiceProxy, private _dataSharingSerivce: DataSharingServiceProxies) {

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
      this._homeService.getDefectTrend(filter.duration, filter.product, filter.stage)
      .subscribe(result => {
        this.optionsArea.series = []
        this.optionsArea.series.push({name: 'All', data: result.all})
        result.data.forEach(x => this.optionsArea.series.push({name: x.name, data: x.data}))
        this.optionsArea.xaxis.categories = result.labels
        this.chart = renderCharts("#defectstrend", this.optionsArea);
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
