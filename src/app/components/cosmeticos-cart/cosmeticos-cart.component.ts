import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ApiCosmeticos, Cosmetico } from '../../common/interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cosmeticos-cart',
  imports: [CurrencyPipe],
  templateUrl: './cosmeticos-cart.component.html',
  styleUrl: './cosmeticos-cart.component.css'
})
export class CosmeticosCartComponent {

  private readonly cartService: CartService = inject(CartService);

  cosmeticos: Cosmetico[] = [];
  cosmeticoPrice: number = 0;

  constructor() {
    this.loadCart();
  }

  public loadCart() {
    this.cartService.carrito.subscribe(
      {
        next: value => {
          this.cosmeticos = value;
        }
      }
    )
    this.cartService.carritoPrice.subscribe(
      {
        next: value => {
          this.cosmeticoPrice = value
        }
      }
    )
  }

}
