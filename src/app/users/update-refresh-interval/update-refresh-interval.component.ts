import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { ChangeRefreshTimeDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-refresh-interval',
  templateUrl: './update-refresh-interval.component.html',
  styleUrls: ['./update-refresh-interval.component.css']
})
export class UpdateRefreshIntervalComponent extends AppComponentBase implements OnInit {

  saving = false;
  selectedInterval = 1
  intervals = [
  {
    id: 1,
    name: "1"
  },
  {
    id: 3,
    name: "3"
  },
  {
    id: 5,
    name: "5"
  },
  {
    id: 10,
    name: "10"
  }
  ]

  constructor(injector: Injector,
    public bsModalRef: BsModalRef, private _userService: UserServiceProxy, private _dataSharingService: DataSharingServiceProxies) {
      super(injector)
     }

  ngOnInit(): void {
    const interval = abp.setting.get('Abp.Localization.RefreshInterval');
    if (interval) {
      this.selectedInterval = parseInt(interval);
    } else {
      this.selectedInterval = 1;
    }
  }

  save() {
    let dto = new ChangeRefreshTimeDto()
    dto.refreshTime = this.selectedInterval
    this._userService.changeRefreshTimeSettings(dto).subscribe(x => {
      abp.notify.success(this.l("RefreshIntervalUpdatedSuccessfully"))
      this._dataSharingService.refreshTimeChanged.next(this.selectedInterval.toString())
    },
    (err) => {
      abp.notify.error(this.l("RefreshIntervalNotUpdated"))
    })
  }
}
