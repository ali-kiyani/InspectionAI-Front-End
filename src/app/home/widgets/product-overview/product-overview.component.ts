import { Component, Injector, OnInit } from '@angular/core';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { OverviewDashboardServiceProxy, OverviewGeneralInsightsDto } from '../../../../shared/service-proxies/service-proxies';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {

  insights = new OverviewGeneralInsightsDto();
  loaded = false
  spark1 = {
    chart: {
      id: 'spark1',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: []
    }],
    labels: [],
    stroke: {
      curve: 'straight'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    colors: ['#fff'],
    tooltip: {
      enabled: false,
      marker: {
        show: false,
    },
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }

  spark2 = {
    chart: {
      id: 'spark2',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    labels: [],
    series: [{
      data: []
    }],
    stroke: {
      curve: 'straight'
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    markers: {
      size: 0
    },
    colors: ['#fff'],
    tooltip: {
      enabled: false,
      marker: {
        show: false,
    },
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
  
  spark3 = {
    chart: {
      id: 'spark3',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    labels: [],
    series: [{
      data: []
    }],
    stroke: {
      curve: 'straight'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    colors: ['#fff'],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    tooltip: {
      enabled: false,
      marker: {
        show: false,
    },
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }

  chart1
  chart2
  chart3
  constructor(injector: Injector, private _homeService: OverviewDashboardServiceProxy, private _dataSharingSerivce: DataSharingServiceProxies) { }

  ngOnInit(): void {
    this.insights.totalDefects = 0;
    this.insights.totalDetections = 0;
    this.insights.totalGood = 0;
    this._dataSharingSerivce.filterOverviewDashboard.subscribe(filter => {
      if (filter.duration === null) {
        return
      } else {
          if (this.chart1 !== null && this.chart1 !== undefined) {
            this.chart1.destroy()
            this.chart2.destroy()
            this.chart3.destroy()
          }
      }
      this._homeService.getGeneralInsights(filter.duration)
      .subscribe(result => {
        this.insights = result;
        this.spark1.labels = result.labels
        this.spark2.labels = result.labels
        this.spark3.labels = result.labels
        this.spark1.series[0].data = []
        this.spark2.series[0].data = []
        this.spark3.series[0].data = []
        this.spark1.series[0].data = result.detections
        this.spark2.series[0].data = result.good
        this.spark3.series[0].data = result.defects
        this.chart1= renderCharts("#view1", this.spark1);
        this.chart2= renderCharts("#view2", this.spark2);
        this.chart3= renderCharts("#view3", this.spark3);
        this.loaded = true
      })

      })
  }

}
