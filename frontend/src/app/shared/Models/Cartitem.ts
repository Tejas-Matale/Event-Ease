import { Event } from "./Event";

export class Cartitem{
    constructor(public event:Event){
    }
    quantity:number=1;
    price:number=this.event.price
}