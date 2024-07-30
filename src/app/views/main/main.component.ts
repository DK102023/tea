import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import 'jquery-ui-dist/jquery-ui';


import {Subscription, timer} from "rxjs";
import {PopupDelayComponent} from "../../shared/components/popup-delay/popup-delay.component";



declare var WOW: any;
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit,OnDestroy {
  private popupSubscription: Subscription | null = null;
  @ViewChild(PopupDelayComponent) popupComponent!: PopupDelayComponent;

  constructor() { }

  ngOnInit(): void {
    // Инициализация WOW.js
    new WOW().init();
   // new WOW.WOW().init();

    // Инициализация Slick Carousel
    $(document).ready(() => {
      $('.slick-slider').slick({
        prevArrow: '.slick-prev',
        nextArrow: '.slick-next'
      });
    });

    // Таймер на 10 секунд
  /*  this.popupSubscription = timer(10000).subscribe(() => {
      this.popupComponent.openModal();
    });*/


  }

  ngAfterViewInit(): void {
    $( "#accordion" ).accordion();
  }

  ngOnDestroy(): void {
    // Отписываемся от таймера, если пользователь уходит с страницы
  //  this.popupSubscription?.unsubscribe();
  }

}
