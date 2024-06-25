import { Injectable } from '@angular/core';
import { Cart } from '../shared/Models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../shared/Models/Event';
import { Cartitem } from '../shared/Models/Cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart=this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart>=new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(event:Event):void{
    let cartItem=this.cart.items
    .find(item=>item.event._id === event._id)
    if(cartItem)
      return;

    this.cart.items.push(new Cartitem(event))
    this.setCartToLocalStorage()
  }

  removeFromCart(eventId:string):void{
    this.cart.items=this.cart.items
    .filter(item=>item.event._id!= eventId)
    this.setCartToLocalStorage()
  }

  changeQuantity(eventId:string,quantity:number){
    let cartItem=this.cart.items
    .find(item=>item.event._id===eventId)
    if(!cartItem) return;

    cartItem.quantity=quantity;
    cartItem.price=quantity * cartItem.event.price
    this.setCartToLocalStorage()
  }

  clearCart(){
    this.cart=new Cart();
    this.setCartToLocalStorage()
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }


  //stores the users cart item locally even after refresh
  private setCartToLocalStorage():void{
    this.cart.totalPrice=this.cart.items
    .reduce((preSum,currentItem)=>preSum+currentItem.price,0)
    this.cart.totalCount=this.cart.items
    .reduce((preSum,currentItem)=>preSum+currentItem.quantity,0)

    const cartTejas=JSON.stringify(this.cart);
    localStorage.setItem('Cart',cartTejas);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartTejas=localStorage.getItem('Cart');
    return cartTejas? JSON.parse(cartTejas):new Cart();
  }
}
