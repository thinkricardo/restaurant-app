import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../../../../environments/environment';

import { CartOptionsComponent } from '../../cart/cart-options/cart-options.component';

import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CartOptionsComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  cartService = inject(CartService);

  product = input<Product>(<Product>{});

  isInCart = signal<boolean>(false);

  serverUrl = environment.serverUrl;

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data) => {
      if (!data) return;

      this.isInCart.set(
        data.findIndex((c) => c.productId === this.product().id) >= 0
      );
    });
  }

  addProduct() {
    this.cartService.addProductToCart(this.product());
  }
}
