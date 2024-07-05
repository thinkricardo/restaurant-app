import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOptionsComponent } from './cart-options.component';

describe('CartOptionsComponent', () => {
  let component: CartOptionsComponent;
  let fixture: ComponentFixture<CartOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
