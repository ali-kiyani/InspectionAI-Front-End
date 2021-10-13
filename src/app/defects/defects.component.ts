import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { StageDto, StageServiceProxy } from '@shared/service-proxies/service-proxies';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-defects',
  templateUrl: './defects.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./defects.component.css']
})
export class DefectsComponent extends AppComponentBase implements OnInit {

  selectedStage = 0
  selectedDuration = 'Weekly'
  durations = [
      { id: 'Weekly', name: 'Weekly' },
      { id: 'Monthly', name: 'Monthly' },
      { id: 'Yearly', name: 'Yearly' }
  ];
  stages: StageDto[]


  constructor(injector: Injector, private _stageService: StageServiceProxy, private _lightbox: Lightbox) { 
    super(injector)
  }

  imgList = [];

  ngOnInit(): void {
    this._stageService.getAllStages()
    .subscribe(result => {
      this.stages = result.items
      this.selectedDuration = 'Weekly'
      this.selectedStage = this.stages[0].id
    });
    for (let i = 2; i < 9; i++) {
      const album = {
        src: 'assets/img/'+i+'.jpg'
      };
      this.imgList.push(album);
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.imgList, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  apply() {
    if(this.selectedStage === 0) {
      return
    }
  }
}
