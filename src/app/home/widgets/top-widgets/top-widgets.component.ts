import { AfterViewInit, ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { DetailedDashboardServiceProxy, OverviewGeneralInsightsDto } from '@shared/service-proxies/service-proxies';

declare function renderCharts(selector, options);

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css'],
  animations: [appModuleAnimation()]
})
export class TopWidgetsComponent extends AppComponentBase implements OnInit, AfterViewInit {

  insights = new OverviewGeneralInsightsDto();
  loaded = false
  spark1 = {
    chart: {
      id: 'spark1',
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

  constructor(injector: Injector, private _homeService: DetailedDashboardServiceProxy, private _dataSharingSerivce: DataSharingServiceProxies) {
    super(injector);
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.insights.totalDefects = 0;
    this.insights.totalDetections = 0;
    this.insights.totalGood = 0;
    this._dataSharingSerivce.filterDetailedDashboard.subscribe(filter => {
      if (filter.product === 0 || filter.stage === 0) {
        return
      }
      this._homeService.getGeneralInsights(filter.duration, filter.product, filter.stage)
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
        if (this.chart1 === null || this.chart1 === undefined) {
          this.chart1= renderCharts("#spark1", this.spark1);
          this.chart2= renderCharts("#spark2", this.spark2);
          this.chart3= renderCharts("#spark3", this.spark3);
        } else {
          this.chart1.updateOptions({
            series: [{data: this.spark1.series[0].data}],
            labels: this.spark1.labels
          })
          this.chart2.updateOptions({
            series: [{data: this.spark2.series[0].data}],
            labels: this.spark2.labels
          })
          this.chart3.updateOptions({
            series: [{data: this.spark3.series[0].data}],
            labels: this.spark3.labels
          })
        }
        this.loaded = true
      })

      })
  }
}

