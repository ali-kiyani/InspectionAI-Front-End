import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AppComponentBase {
  switch = true
  constructor(injector: Injector, private _modalService: BsModalService) {
    super(injector);
  }

  dashboardSwitchChange(state) {
    this.switch = state
  }

  dashboardSelected() {
    return this.switch
  }
}
