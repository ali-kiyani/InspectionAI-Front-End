import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';

@Component({
  selector: 'app-bird-eye-dashboard',
  templateUrl: './bird-eye-dashboard.component.html',
  styleUrls: ['./bird-eye-dashboard.component.css']
})
export class BirdEyeDashboardComponent extends AppComponentBase implements OnInit {

  selectedDuration = 'Weekly'
  durations = [
      { id: 'Weekly', name: 'Weekly' },
      { id: 'Monthly', name: 'Monthly' },
      { id: 'Yearly', name: 'Yearly' }
  ];
  constructor(injector: Injector, private _dataSharingSerivce: DataSharingServiceProxies) {
    super(injector)
   }

  ngOnInit(): void {
  }

  apply() {
    this._dataSharingSerivce.filterOverviewDashboard.next({duration: this.selectedDuration})
  }
}
