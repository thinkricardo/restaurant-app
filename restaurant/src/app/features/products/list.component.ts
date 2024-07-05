import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';

import { ProductsService } from '@services/products.service';

import { Product } from '@models/product.model';

import { DishType } from '@enums/dish-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {
  productsService = inject(ProductsService);

  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);

  search = '';

  DishType = DishType;

  currentDishType = DishType.Popular;

  subscription: Subscription = Subscription.EMPTY;

  ngOnInit(): void {
    this.getDishes(this.currentDishType);
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  getDishes(dishType: DishType) {
    this.currentDishType = dishType;

    this.subscription = this.productsService
      .getDishes(dishType)
      .subscribe((data) => {
        this.products.set(data);
        this.filteredProducts.set(data);

        this.searchDishes();
      });
  }

  searchDishes() {
    console.log(this.search.trim().length);
    if (this.search.trim().length === 0) {
      this.filteredProducts.set(this.products());
      return;
    }

    this.filteredProducts.set(
      this.products().filter((p) => {
        return p.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
      })
    );
  }
}
