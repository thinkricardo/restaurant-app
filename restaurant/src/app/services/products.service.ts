import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';

import { Product } from '@models/product.model';

import { DishType } from '@enums/dish-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly http: HttpClient) {}

  getDishes(dishType: DishType) {
    switch (dishType) {
      case DishType.Burgers:
        return this.getBurgers();

      case DishType.Steaks:
        return this.getSteaks();

      default:
        return this.getPopular();
    }
  }

  getPopular() {
    return this.http.get<Product[]>(
      `${environment.serverUrl}/dishes?popular=true`
    );
  }

  getBurgers() {
    return this.http.get<Product[]>(
      `${environment.serverUrl}/dishes?category=Burgers`
    );
  }

  getSteaks() {
    return this.http.get<Product[]>(
      `${environment.serverUrl}/dishes?category=Steaks`
    );
  }
}
