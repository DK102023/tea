import {Component, OnDestroy, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  public  products: ProductType[] = []

  constructor(private  productService: ProductService,  private  router: Router,
              private  http: HttpClient) { }

  loading: boolean = false;

  ngOnInit(): void {

    this.loading = true;  // старт лоадера
    this.productService.getProducts()
      .pipe(
        tap(()=>{
          this.loading = false; // финиш лоадера
        })
      )
      .subscribe( {
        next:  (data)=>{
          //  this.loading = false; // финиш лоадера
          this.products = data;
         // console.log(data)
        },
        error: (error) => {
          // this.loading = false; // финиш лоадера
          console.log(error)
          this.router.navigate(['/']);
        }
      })

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
