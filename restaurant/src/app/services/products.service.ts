import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { DishType } from '../features/enums/dish-type.enum';
import { Product } from '../models/product.model';

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
