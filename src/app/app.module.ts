import { TuiRootModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {HttpClientModule} from "@angular/common/http";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MainModule} from "./views/main/main.module";
import {OrderModule} from "./views/order/order.module";
import {ProductsModule} from "./views/products/products.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MainModule,
    OrderModule,
    ProductsModule,
    SharedModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      TuiRootModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
