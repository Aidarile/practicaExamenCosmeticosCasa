import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cosmetico } from '../common/interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carrito: BehaviorSubject<Cosmetico[]> = new BehaviorSubject<Cosmetico[]>([]);

  carritoTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  carritoPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cosmeticos: Cosmetico) {
    const carritoAux: Cosmetico[] = this.carrito.value;
    carritoAux.push(cosmeticos);
    this.carrito.next(carritoAux);

    this.carritoPrice.next(this.carritoPrice.value + cosmeticos.price);

    this.carritoTotal.next(this.carritoTotal.value + 1);
  }
}
