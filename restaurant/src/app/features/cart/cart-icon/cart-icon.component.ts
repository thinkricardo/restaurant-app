import { Component, inject, OnInit, signal } from '@angular/core';

import { CartService } from '../../../services/cart.service';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss',
})
export class CartIconComponent implements OnInit {
  cartService = inject(CartService);
  uiService = inject(UiService);

  totalItems = signal<number>(0);

  ngOnInit() {
    this.cartService.getCart().subscribe((data) => {
      if (!data) return;

      this.totalItems.set(
        data.reduce((acc, current) => acc + current.quantity, 0)
      );
    });
  }

  openCart() {
    this.uiService.openCart();
  }
}
