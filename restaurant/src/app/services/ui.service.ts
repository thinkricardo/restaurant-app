import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private cartPanelState = new BehaviorSubject<boolean>(false);

  getCartPanelState() {
    return this.cartPanelState.asObservable();
  }

  openCart() {
    this.cartPanelState.next(true);
  }

  closeCart() {
    this.cartPanelState.next(false);
  }
}
