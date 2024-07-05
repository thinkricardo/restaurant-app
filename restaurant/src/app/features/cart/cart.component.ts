import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { fadeAnimation, slideAnimation } from '@app/app.animations';

import { CartItemComponent } from './cart-item/cart-item.component';

import { CartService } from '@services/cart.service';
import { UiService } from '@services/ui.service';

import { CartItem } from '@models/cart-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideAnimation, fadeAnimation],
})
export class CartComponent implements OnInit, OnDestroy {
  cartService = inject(CartService);
  uiService = inject(UiService);

  deliveryFee = this.cartService.getDeliveryFee();

  items = signal<CartItem[]>([]);

  subtotal = signal<number>(0);
  total = signal<number>(0);

  cartState = signal<string>('out');
  isOpen = signal<boolean>(false);

  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.updateValues();
    this.updateState();
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((s) => {
        if (s && !s.closed) {
          s.unsubscribe();
        }
      });
    }
  }

  updateValues() {
    const subscription = this.cartService.getCart().subscribe((data) => {
      if (!data) return;

      this.items.set(data);

      this.subtotal.set(
        data.reduce((acc, current) => acc + current.price * current.quantity, 0)
      );

      this.total.set(this.subtotal() + this.cartService.getDeliveryFee());
    });

    this.subscriptions.push(subscription);
  }

  updateState() {
    const subscription = this.uiService
      .getCartPanelState()
      .subscribe((data) => {
        this.isOpen.set(data);
        this.cartState.set(data ? 'in' : 'out');
      });

    this.subscriptions.push(subscription);
  }

  closeCart() {
    this.uiService.closeCart();
  }
}
