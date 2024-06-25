import { Component, OnInit } from '@angular/core';
import { Event } from '../../../shared/Models/Event';
import { EventService } from '../../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected to 'styleUrls' instead of 'styleUrl'
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  visible: boolean = true;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.fetchEvents(params);
    });
  }

  fetchEvents(params: any): void {
    let eventObservable: Observable<Event[]>;

    if (params['searchTerm']) {
      eventObservable = this.eventService.getAllEventsBySearchTerm(params['searchTerm']);
    } else if (params['tag']) {
      eventObservable = this.eventService.getAllEventsByTag(params['tag']);
    } else {
      eventObservable = this.eventService.getAll();
    }

    eventObservable.subscribe((serverEvents) => {
      this.events = serverEvents;
      this.visible = this.events.length === 0;
    }, (error) => {
      console.error('Error fetching events:', error);
      this.visible = true;
    });
  }

  resetSearch(): void {
    this.eventService.getAll().subscribe((serverEvents) => {
      this.events = serverEvents;
      this.visible = this.events.length === 0;
    });
  }
}
