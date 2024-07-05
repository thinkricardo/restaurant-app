import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ListComponent } from '@products/list.component';
import { CartComponent } from '@cart/cart.component';
import { CartIconComponent } from '@cart/cart-icon/cart-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, CartComponent, CartIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
