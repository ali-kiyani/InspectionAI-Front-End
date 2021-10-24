import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { DetailedAssemblyDefects, DetailedDashboardServiceProxy } from '@shared/service-proxies/service-proxies';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-assembly-defects',
  templateUrl: './assembly-defects.component.html',
  styleUrls: ['./assembly-defects.component.css']
})
export class AssemblyDefectsComponent implements OnInit, AfterViewInit {

  assemblyDefects: DetailedAssemblyDefects
  sum = 0
  chart
  optionsCircle4 = {
    chart: {
      type: 'radialBar',
      height: 365
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total Defects',
            formatter: function(w) {
              return w.config.tempSum
            }
          }
        },
        inverseOrder: true,
        hollow: {
          margin: 5,
          size: '48%',
          background: 'transparent',
  
        },
        track: {
          show: false,
        },
        startAngle: -180,
        endAngle: 180
      },
    },
    stroke: {
      lineCap: 'round'
    },
    series: [],
    labels: [],
    tempSum: 0,
    legend: {
      show: true,
      floating: true,
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 320
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  constructor(private _homeService: DetailedDashboardServiceProxy, private _dataSharingSerivce: DataSharingServiceProxies) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this._dataSharingSerivce.filterDetailedDashboard.subscribe(filter => {
      if (filter.duration === null || filter.stage === 0) {
        return
      } else {
        if (this.chart !== null && this.chart !== undefined)
        this.chart.destroy()
      }
      this._homeService.getAssemblyDefects(filter.duration, filter.product, filter.stage)
      .subscribe(result => {
        this.optionsCircle4.labels = result.assemblyNames;
        this.sum = result.assemblyDefectsCount.reduce((a, b) => a + b, 0);
        this.optionsCircle4.tempSum = this.sum
        let percent = []
        if (this.sum > 0)
        {
          for (let i = 0; i < result.assemblyDefectsCount.length; i++)
          {
          if (result.assemblyDefectsCount[i] !== 0)
              percent.push(((result.assemblyDefectsCount[i] / this.sum) * 100).toFixed(1));
          }
        }
        this.optionsCircle4.series = percent;
        this.chart = renderCharts("#assemblydefects", this.optionsCircle4);
      });
    })
  }
}

