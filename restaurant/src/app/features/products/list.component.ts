import { Component, inject, signal } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { DishType } from '../enums/dish-type.enum';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  productsService = inject(ProductsService);

  products: Product[] = [];
  filteredProducts: Product[] = [];

  search = '';

  DishType = DishType;

  currentDishType = DishType.Popular;

  ngOnInit(): void {
    this.getDishes(this.currentDishType);
  }

  getDishes(dishType: DishType) {
    this.currentDishType = dishType;

    this.productsService.getDishes(dishType).subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;

      this.searchDishes();
    });
  }

  searchDishes() {
    if (this.search.trim().length === 0) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter((p) => {
      return p.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
    });
  }
}
