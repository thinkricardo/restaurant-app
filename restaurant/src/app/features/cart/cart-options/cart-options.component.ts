import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import { map, Subscription } from 'rxjs';

import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-cart-options',
  standalone: true,
  templateUrl: './cart-options.component.html',
  styleUrl: './cart-options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartOptionsComponent implements OnInit, OnDestroy {
  cartService = inject(CartService);

  productId = input<number>(0);

  quantity = signal<number>(0);

  subscription: Subscription = Subscription.EMPTY;

  ngOnInit() {
    this.subscription = this.cartService
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

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  updateQuantity(amount: number) {
    this.cartService.updateQuantity(this.productId(), amount);
  }
}
