import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { AssemblyDetectionDto, AssemblyDetectionServiceProxy, PagedAssemblyDetectionResutlRequestDto, 
  ProductServiceProxy, DefectiveProductsResponse, ProductHeirarchyDto, StageIncDto, AssemblyLineIncDto, DefectsDto, ProductIncDto } from '@shared/service-proxies/service-proxies';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-defects',
  templateUrl: './defects.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./defects.component.css']
})
export class DefectsComponent extends PagedListingComponentBase<AssemblyDetectionDto> implements OnInit {

  assemblyDetection = new PagedAssemblyDetectionResutlRequestDto()
  productsHeirarchy: ProductHeirarchyDto
  products: ProductIncDto[] = new Array()
  stages: StageIncDto[] = new Array()
  assemblyLines: AssemblyLineIncDto[] = new Array()
  selectedObj: DefectiveProductsResponse = null
  defectiveProducts: DefectiveProductsResponse[] = new Array()
  defects: DefectsDto[] = new Array()
  selectedDefect: number
  loaded = false
  skip = 0

  constructor(injector: Injector, private _productService: ProductServiceProxy, private _assemblyDetectionsService: AssemblyDetectionServiceProxy) { 
    super(injector)
  }

  imgList = [];

  ngOnInit(): void {
    this.assemblyDetection.assemblyLineId = 0
    this.assemblyDetection.defectIds = []
    this.assemblyDetection.productId = 0
    this.assemblyDetection.stageId = 0
    this.selectedDefect = 0
    AWS.config.update({
      accessKeyId: "AKIATOIU7PIWHNLCGDIY", secretAccessKey: "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"
    });

    this._productService.getAllProductsHeirarchy()
    .subscribe(result => {
      this.products = result.products
      if (this.products.length > 0) {
        this.assemblyDetection.productId = this.products[0].productId
        if (this.products[0].stages.length > 0) {
          this.assemblyDetection.stageId = this.products[0].stages[0].stageId
          if (this.products[0].stages[0].assemblyLines.length > 0) {
            this.assemblyDetection.assemblyLineId = this.products[0].stages[0].assemblyLines[0].id
            this.stages = this.products.find(x => x.productId == this.assemblyDetection.productId).stages
            this.assemblyLines = this.products.find(x => x.productId == this.assemblyDetection.productId).stages.find(x => x.stageId == this.assemblyDetection.stageId).assemblyLines
            this.defects = this.products.find(x => x.productId == this.assemblyDetection.productId).stages.find(x => x.stageId == this.assemblyDetection.stageId).defects
            if (this.defects.length > 0) {
              this.assemblyDetection.defectIds.push(this.defects[0].id)
              this.selectedDefect = this.defects[0].id
              this.refresh()
            }
          }
        }
      }
    });
  }

  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

    this.assemblyDetection.maxResultCount  = request.maxResultCount
    this.assemblyDetection.skipCount = request.skipCount
    this._assemblyDetectionsService.getDefectiveProducts(this.assemblyDetection)
    .pipe(
      finalize(() => {
        finishedCallback();
      })
    )
    .subscribe((result) => {
      this.defectiveProducts =  result.items
      let i = 0
      this.defectiveProducts.filter(x => x.imageUrl != null).forEach(x => {
        const params = {
          Bucket: 'thal',
          Key: x.imageUrl
       }
      var bucket = new AWS.S3({ params: { Bucket: "thal" } });
      bucket.getSignedUrlPromise("getObject", params)
        .then((value: string) => {
          x.imageUrl = value
          if (i === 0) {
            this.imageSelected(x)
            i++
            this.loaded = true
          }
        }, err => {
          console.log(`Error in fetching image ${err}`)
        })
      })
      this.showPaging(result, pageNumber)
    })
  }
  protected delete(entity: AssemblyDetectionDto): void {
  }

  apply() {
    this.assemblyDetection.defectIds = [] 
    this.assemblyDetection.defectIds.push(this.selectedDefect)
    this.refresh()
  }

  productChanged() {
    this.defects = []
    this.assemblyLines = []
    this.assemblyDetection.defectIds = []
    this.stages = this.products.find(x => x.productId == this.assemblyDetection.productId).stages
    if (this.stages.length > 0) {
      this.assemblyDetection.stageId = this.stages[0].stageId
    }
    this.assemblyLines = this.products.find(x => x.productId == this.assemblyDetection.productId).stages.find(x => x.stageId == this.assemblyDetection.stageId).assemblyLines
    if (this.assemblyLines.length > 0) {
      this.assemblyDetection.assemblyLineId = this.stages[0].assemblyLines[0].id
    }
    this.defects = this.products.find(x => x.productId == this.assemblyDetection.productId).stages.find(x => x.stageId == this.assemblyDetection.stageId).defects

    if (this.defects.length > 0) {
      this.assemblyDetection.defectIds.push(this.stages[0].defects[0].id)
      this.selectedDefect = this.stages[0].defects[0].id
    }
  }

  stageChanged() {
    this.assemblyLines = []
    this.assemblyDetection.defectIds = []
    this.assemblyLines = this.products.find(x => x.productId == this.assemblyDetection.productId).stages.find(x => x.stageId == this.assemblyDetection.stageId).assemblyLines
    if (this.assemblyLines.length > 0) {
      this.assemblyDetection.assemblyLineId = this.stages[0].assemblyLines[0].id
    }
    this.defects = this.products.find(x => x.productId == this.assemblyDetection.productId).stages.find(x => x.stageId == this.assemblyDetection.stageId).defects
    
    if (this.defects.length > 0) {
      this.assemblyDetection.defectIds.push(this.stages[0].defects[0].id)
      this.selectedDefect = this.stages[0].defects[0].id
    }
  }

  imageSelected(obj) {
      this.selectedObj = obj
      this.selectedObj.defectNames = [ ...new Set(this.selectedObj.defectNames) ]
  }
}
