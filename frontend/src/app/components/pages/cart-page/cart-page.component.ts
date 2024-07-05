import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../shared/Models/Cart';
import { CartService } from '../../../services/cart.service';
import { Cartitem } from '../../../shared/Models/Cartitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})

export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService, private router: Router) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }

  ngOnInit(): void {
  }

  removeFromCart(cartItem:Cartitem){
    this.cartService.removeFromCart(cartItem.event._id);
  }

  changeQuantity(cartItem:Cartitem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.event._id, quantity);
  }

  handleReset() {
    this.router.navigate(['/']);
  }
}

