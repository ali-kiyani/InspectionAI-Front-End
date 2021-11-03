import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UpdateRefreshIntervalComponent } from '@app/users/update-refresh-interval/update-refresh-interval.component';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent {
  constructor(private _authService: AppAuthService, private _modalService: BsModalService) {}

  logout(): void {
    this._authService.logout();
  }

  refreshInterval() {
    this._modalService.show(
      UpdateRefreshIntervalComponent,
      {
        class: 'modal-md',
      }
    );
  }
}
