import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartOptionsComponent } from '@cart/cart-options/cart-options.component';

import { CartService } from '@services/cart.service';
import { CartItem } from '@models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, CartOptionsComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  cartService = inject(CartService);

  item = input<CartItem>(<CartItem>{});

  total = computed(() => {
    return this.item().price * this.item().quantity;
  });
}
