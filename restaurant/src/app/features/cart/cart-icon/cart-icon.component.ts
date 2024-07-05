import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import { CartService } from '@services/cart.service';
import { UiService } from '@services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartIconComponent implements OnInit, OnDestroy {
  cartService = inject(CartService);
  uiService = inject(UiService);

  totalItems = signal<number>(0);

  subscription: Subscription = Subscription.EMPTY;

  ngOnInit() {
    this.subscription = this.cartService.getCart().subscribe((data) => {
      if (!data) return;

      this.totalItems.set(
        data.reduce((acc, current) => acc + current.quantity, 0)
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  openCart() {
    this.uiService.openCart();
  }
}
