import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {ProductType} from "../../../types/product.type";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea').pipe(
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createOrder(data: { product: string, name: string, last_name: string, phone: string, country: string, zip: string, address: string, comment: string }) {
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.ru/order-tea`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Проблемы на стороне клиента
      console.error('Ошибка клиента', error.error);
    } else {
      // Проблемы на стороне сервера - вернул не правильный код ответа
      console.error(`Сервер вернул:  ${error.status}, тело ошибки: `, error.error);
    }
    return throwError(() => new Error('Отправка данных не прошла. Попробуйте позже!'));
  }
}
