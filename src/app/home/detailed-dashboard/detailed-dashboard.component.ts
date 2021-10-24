import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { ProductDto, ProductServiceProxy, StageDto, StageServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-detailed-dashboard',
  templateUrl: './detailed-dashboard.component.html',
  styleUrls: ['./detailed-dashboard.component.css']
})
export class DetailedDashboardComponent extends AppComponentBase implements OnInit {

  selectedStage = 0
  selectedProduct = 0
  selectedDuration = 'Weekly'
  showWarning = false;
  durations = [
      { id: 'Weekly', name: 'Weekly' },
      { id: 'Monthly', name: 'Monthly' },
      { id: 'Yearly', name: 'Yearly' }
  ];

  stages: StageDto[]
  products: ProductDto[]

  constructor(injector: Injector,private _productService: ProductServiceProxy, private _stageService: StageServiceProxy, private _dataSharingSerivce: DataSharingServiceProxies) {
    super(injector)
   }

  ngOnInit(): void {
    this._productService.getAllProducts()
    .subscribe(p => {
      if (p.items.length === 0)
        return
      this.products = p.items
      this.selectedProduct = p.items[0].id
      this.getStages(this.selectedProduct, true)
      this.selectedDuration = 'Weekly'
      this.apply()
    })
  }

  getStages(pId, apply) {
    this._stageService.getProductStages(pId)
    .subscribe(result => {
      this.stages = result.items
      this.selectedStage = this.stages[0].id
      if (apply) {
        this.apply()
      }
    });
  }

  apply() {
    if(this.selectedStage === 0) {
      this.showWarning = true
      return
    }
    this._dataSharingSerivce.filterDetailedDashboard.next({duration: this.selectedDuration, product: this.selectedProduct, stage: this.selectedStage})
  }

  productChanged(id) {
    this.getStages(id, false)
  }
}
