import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogueComponent} from "./catalogue/catalogue.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  {path:'catalogue', component: CatalogueComponent},
  {path:'catalogue/:id', component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
