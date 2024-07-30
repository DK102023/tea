import { Component, Input, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Router } from "@angular/router";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-popup-delay',
  templateUrl: './popup-delay.component.html',
  styleUrls: ['./popup-delay.component.css']
})
export class PopupDelayComponent implements OnInit, OnDestroy {
  @Input() modalTitle: string = '';
  @Input() modalDescription: string = 'Посмотрите наши чайные коллекции';
  @Input() delay: number = 10000; // Задержка по умолчанию 10 секунд

  @ViewChild('content', { static: true }) content!: TemplateRef<any>;

  private popupSubscription: Subscription | null = null;

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    // Таймер на указанное количество миллисекунд
    this.popupSubscription = timer(this.delay).subscribe(() => {
      this.openModal();
    });
  }

  ngOnDestroy(): void {
    // Отписываемся от таймера, если компонент уничтожается
    this.popupSubscription?.unsubscribe();
  }

  openModal() {
    this.modalService.open(this.content, { centered: true });
  }

  closeModal(modal: NgbActiveModal) {
    modal.dismiss('Cross click');
  }

  navigateToCatalogue(modal: NgbActiveModal) {
    this.closeModal(modal);
    this.router.navigate(['/catalogue']);
  }
}

