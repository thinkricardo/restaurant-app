import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '@env/environment';

import { CartOptionsComponent } from '@cart/cart-options/cart-options.component';

import { CartService } from '@services/cart.service';

import { Product } from '@models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CartOptionsComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit, OnDestroy {
  cartService = inject(CartService);

  product = input<Product>(<Product>{});

  isInCart = signal<boolean>(false);

  serverUrl = environment.serverUrl;

  subscription: Subscription = Subscription.EMPTY;

  ngOnInit(): void {
    this.subscription = this.cartService.getCart().subscribe((data) => {
      if (!data) return;

      this.isInCart.set(
        data.findIndex((c) => c.productId === this.product().id) >= 0
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  addProduct() {
    this.cartService.addProductToCart(this.product());
  }
}
