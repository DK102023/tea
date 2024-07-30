import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsRoutingModule } from './products-routing.module';
import {CatalogueComponent} from "./catalogue/catalogue.component";
import {ProductComponent} from "./product/product.component";
import {SharedModule} from "../../shared/shared.module";




@NgModule({
  declarations: [
    CatalogueComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
