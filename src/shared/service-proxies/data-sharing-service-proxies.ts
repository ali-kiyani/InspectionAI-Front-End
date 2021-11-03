import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceProxies {

  public filterDetailedDashboard = new BehaviorSubject<{duration: string, product: number, stage: number}>({duration: 'Weekly', product: 0, stage: 0});
 
  public filterOverviewDashboard = new BehaviorSubject<{duration: string}>({duration: 'Weekly'});
  
  public refreshDataOnPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public pauseRefreshDataOnPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public refreshTimeChanged: BehaviorSubject<string> = new BehaviorSubject<string>(null);

}
