import { Component, inject, input, OnInit, signal } from '@angular/core';

import { map } from 'rxjs';

import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-options',
  standalone: true,
  templateUrl: './cart-options.component.html',
  styleUrl: './cart-options.component.scss',
})
export class CartOptionsComponent implements OnInit {
  cartService = inject(CartService);

  productId = input<number>(0);

  quantity = signal<number>(0);

  ngOnInit() {
    this.cartService
      .getCart()
      .pipe(
        map((items) => {
          if (!items) return;
          return items.find((item) => item.productId === this.productId());
        })
      )
      .subscribe((item) => {
        if (!item) return;

        this.quantity.set(item.quantity);
      });
  }

  updateQuantity(amount: number) {
    this.cartService.updateQuantity(this.productId(), amount);
  }
}
