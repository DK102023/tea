import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProductType} from "../../../../types/product.type";


@Component({
  selector: 'app-catalogue-item',
  templateUrl: './catalogue-item.component.html',
  styleUrls: ['./catalogue-item.component.css']
})
export class CatalogueItemComponent implements OnInit, OnChanges {

  @Input() product: ProductType = {} as ProductType;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes:SimpleChanges){
   // console.log('OnChanges: ', changes)
  }

}
