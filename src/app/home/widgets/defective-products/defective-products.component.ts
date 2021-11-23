import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { OverviewDashboardServiceProxy } from '@shared/service-proxies/service-proxies';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-defective-products',
  templateUrl: './defective-products.component.html',
  styleUrls: ['./defective-products.component.css']
})
export class DefectiveProductsComponent implements OnInit, OnDestroy {

  optionDonut = {
    chart: {
        type: 'donut',
        width: '100%',
        height: 425
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: '70%',
          labels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total Defects',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
              }
            }
          }
        }
      }
    },
    series: [],
    labels: [],
    legend: {
      position: 'bottom'
    }
  }

  chart

  constructor(private _dataSharingSerivce: DataSharingServiceProxies, private _homeService: OverviewDashboardServiceProxy) { }

  ngOnDestroy(): void {
    debugger
    if (this.chart !== null && this.chart !== undefined) {
      this.chart.destroy()
    }
  }

  ngOnInit(): void {
    this._dataSharingSerivce.filterOverviewDashboard.subscribe(filter => {

      this._homeService.getDefectiveProducts(filter.duration)
      .subscribe(result => {
        this.optionDonut.labels = result.names
        this.optionDonut.series = result.count
        if (this.chart === null || this.chart === undefined) {
          this.chart = renderCharts('#defectiveproducts', this.optionDonut);
        } else {
          this.chart.updateOptions({
            series: result.count,
            labels: result.names
          })
        }
      })
    })

  }

}
