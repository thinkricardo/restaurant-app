import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, tap } from 'rxjs';

import { environment } from '@env/environment';

import { CartItem } from '@models/cart-item.model';
import { Product } from '@models/product.model';
import { Basket } from '@models/basket.model';

const storageKeyId = 'restaurant_session_id';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[] | undefined>(undefined);
  private items: CartItem[] = [];

  constructor(private readonly http: HttpClient) {
    this.cart.subscribe((data) => {
      if (!data) {
        this.loadCart()?.subscribe();
        return;
      }

      this.updateCart().subscribe();
    });
  }

  loadCart() {
    const sessionId = localStorage.getItem(storageKeyId);

    if (!sessionId) return undefined;

    return this.http
      .get<[Basket]>(`${environment.serverUrl}/basket?id=${sessionId}`)
      .pipe(
        tap((data: [Basket]) => {
          if (data[0] && data[0].items) {
            this.items = data[0].items;
            this.cart.next(this.items);
          }
        })
      );
  }

  updateCart() {
    const sessionId = localStorage.getItem(storageKeyId);
    let url = `${environment.serverUrl}/basket`;

    let request = null;

    if (!sessionId) {
      request = this.http.post<Basket>(url, {
        items: this.items,
      });
    } else {
      request = this.http.put<Basket>(`${url}/${sessionId}`, {
        items: this.items,
      });
    }

    return request.pipe(
      tap((data) => {
        const sessionId = localStorage.getItem(storageKeyId);

        if (!sessionId) {
          localStorage.setItem(storageKeyId, data.id);
        }
      })
    );
  }

  getDeliveryFee() {
    return 3;
  }

  getCart() {
    return this.cart.asObservable();
  }

  addProductToCart(product: Product) {
    const currentItem = this.items.find((i) => i.productId === product.id);

    if (currentItem) {
      this.updateQuantity(product.id, 1);
    } else {
      const newItem: CartItem = {
        productId: product.id,
        quantity: 1,
        price: product.price,
        name: product.name,
      };

      this.items.push(newItem);
      this.cart.next(this.items);
    }
  }

  updateQuantity(productId: number, amount: number) {
    const currentItemIndex = this.items.findIndex(
      (i) => i.productId === productId
    );

    if (currentItemIndex >= 0) {
      const newQuantity = this.items[currentItemIndex].quantity + amount;

      if (newQuantity < 0) return;

      if (newQuantity === 0) {
        this.items.splice(currentItemIndex, 1);
      } else {
        this.items[currentItemIndex] = {
          ...this.items[currentItemIndex],
          quantity: newQuantity,
        };
      }

      this.cart.next(this.items);
    }
  }
}
