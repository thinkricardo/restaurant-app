import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { CartItemComponent } from './cart-item/cart-item.component';

import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0, 0, 0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 0.3 })),
      ]),
      transition('* => void', [
        animate('400ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  uiService = inject(UiService);

  deliveryFee = this.cartService.getDeliveryFee();

  items = signal<CartItem[]>([]);

  subtotal = signal<number>(0);
  total = signal<number>(0);

  cartState = signal<string>('out');
  isOpen = signal<boolean>(false);

  ngOnInit() {
    this.updateValues();
    this.updateState();
  }

  updateValues() {
    this.cartService.getCart().subscribe((data) => {
      if (!data) return;

      this.items.set(data);

      this.subtotal.set(
        data.reduce((acc, current) => acc + current.price * current.quantity, 0)
      );

      this.total.set(this.subtotal() + this.cartService.getDeliveryFee());
    });
  }

  updateState() {
    this.uiService.getCartPanelState().subscribe((data) => {
      this.isOpen.set(data);
      this.cartState.set(data ? 'in' : 'out');
    });
  }

  closeCart() {
    this.uiService.closeCart();
  }
}
