import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import {ProductService} from "../../shared/services/product.service";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm!: FormGroup;
  isPhoneFieldBlurred = false;
  isDataRecieve: boolean = false;
  sucess: boolean = true;
  showError: boolean = false;
  isLoading: boolean = false;
  public formValues = {
    productTitle: '',
    name: '',
    lastName: '',
    phone: '',
    country: '',
    postIndex: '',
    address: '',
    comments: ''
  }
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private fb: FormBuilder) {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      // Извлечение данных из URL и подстановка в formValues.productTitle
      if (params['product']) {
        this.formValues.productTitle = params['product'];
      }
    });
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      productTitle: [{ value: '', disabled: true }, Validators.required],
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      address: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё0-9\\s\\-\\/]+$')]],
      comment: ['']
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.isLoading = true;
      this.subscriptionOrder = this.productService.createOrder({
        product: this.orderForm.get('productTitle')?.value,
        name: this.orderForm.get('firstName')?.value,
        last_name: this.orderForm.get('lastName')?.value,
        phone: this.orderForm.get('phone')?.value,
        country: this.orderForm.get('country')?.value,
        zip: this.orderForm.get('zip')?.value,
        address: this.orderForm.get('address')?.value,
        comment: this.orderForm.get('comment')?.value,
      }).pipe(
        catchError(error => {
          this.isDataRecieve = false;
          this.showError = true;
         // alert('Ошибка при отправке данных! ' + error.message);
          // Возвращаем observable с пустым ответом, чтобы продолжить выполнение
          //return of({ success: false, message: 'Ошибка при отправке данных!' });
          setTimeout(() => this.showError = false, 3000); // Скрыть ошибку через 3 секунды
          return of({ success: false, message: 'Ошибка при отправке данных!' });
        }),
        finalize(() => {
          this.isLoading = false;
         // console.log('Запрос завершен');
        })
      ).subscribe({
        next: (response) => {
          if (response.success) {
            this.sucess = true;
            this.isDataRecieve = true;
           // alert('Спасибо за заказ!');
            this.clearForm();
          } else {
            this.sucess = false;
            this.isDataRecieve = false;
          //  alert('Ошибка!');
          }
        },
        error: (err) => {
          this.sucess = false;
          this.isDataRecieve = false;
          console.error('Ошибка при отправке данных:', err);
         // alert('Ошибка при отправке данных!');
        }
      });

    //  console.log('Form Submitted', this.orderForm.value);
    } else {
     // console.log('Form NOT Submitted', this.orderForm.getRawValue());
      this.orderForm.markAllAsTouched();
    }




  }

  clearForm(){
    this.formValues = {
      productTitle: '',
      name: '',
      lastName: '',
      phone: '',
      country: '',
      postIndex: '',
      address: '',
      comments: ''
    }

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }
}
