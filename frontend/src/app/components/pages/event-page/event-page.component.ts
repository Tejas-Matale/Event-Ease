import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../shared/Models/Event';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  event: Event | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const eventId = params['_id']; // Use '_id' instead of 'id'
      if (eventId) {
        this.eventService.getEventById(eventId).subscribe(
          (serverEvent: Event) => {
            this.event = serverEvent; // Assign the fetched event to the component property
          },
          (error) => {
            console.error('Error fetching event:', error);
            // Handle error (e.g., show error message)
          }
        );
      }
    });
  }

  addToCart(): void {
    if (this.event) {
      this.cartService.addToCart(this.event); // Add the event to the cart
      this.router.navigateByUrl('/cart-page');
    }
  }
}
