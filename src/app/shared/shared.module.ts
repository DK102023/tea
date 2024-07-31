import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {PopupDelayComponent} from "./components/popup-delay/popup-delay.component";
import {CatalogueItemComponent} from "./components/catalogue-item/catalogue-item.component";
import {ExerptFormatPipe} from "./pipes/exerpt-format.pipe";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    PopupDelayComponent,
    CatalogueItemComponent,
    ExerptFormatPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    PopupDelayComponent,
    CatalogueItemComponent,
    ExerptFormatPipe
  ]
})
export class SharedModule { }
