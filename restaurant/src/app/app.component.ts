import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ListComponent } from './features/products/list.component';
import { CartComponent } from './features/cart/cart.component';
import { CartIconComponent } from './features/cart/cart-icon/cart-icon.component';

import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, CartComponent, CartIconComponent],
  providers: [CartService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Kitchen. Meat house';
}
