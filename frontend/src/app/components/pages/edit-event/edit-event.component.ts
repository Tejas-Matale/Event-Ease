import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../shared/Models/Event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;
  eventId: string;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      time: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      count: ['', Validators.required],
      imageUrl: ['', Validators.required],
      tags: ['']
    });

    this.eventId = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.eventService.getEventById(this.eventId).subscribe(event => {
      this.eventForm.patchValue(event);
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.updateEvent(this.eventId, this.eventForm.value).subscribe(
        (res) => {
          console.log('Event updated successfully:', res);
          alert('Event updated successfully!');
          this.router.navigate(['/']); // Redirect to the home or events list
        },
        (error) => {
          console.error('Error updating event:', error);
          alert('Error updating event');
        }
      );
    }
  }

  onDelete(): void {
    if (confirm("Are you sure you want to delete this event?")) {
      this.eventService.deleteEvent(this.eventId).subscribe(
        (res) => {
          console.log('Event deleted successfully:', res);
          alert('Event deleted successfully!');
          this.router.navigate(['/']); // Redirect to the home or events list
        },
        (error) => {
          console.error('Error deleting event:', error);
          alert('Error deleting event');
        }
      );
    }
  }

  get f() {
    return this.eventForm.controls;
  }
}
