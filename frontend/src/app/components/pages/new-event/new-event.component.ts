import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent {
  eventForm: FormGroup;
  availableTags: string[] = ['Music', 'Art', 'Dance', 'Sports', 'Birthday'];

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      time: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      count: ['', Validators.required],
      imageUrl: ['', Validators.required],
      tags: this.formBuilder.array(this.availableTags.map(() => this.formBuilder.group({ selected: false })))
    });
  }

  get tags(): FormArray {
    return this.eventForm.get('tags') as FormArray;
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const selectedTags = this.eventForm.value.tags
        .map((tag: { selected: boolean }, index: number) => tag.selected ? this.availableTags[index] : null)
        .filter((tag: string | null) => tag !== null);

      const formValue = {
        ...this.eventForm.value,
        tags: selectedTags
      };

      this.eventService.addEvent(formValue).subscribe(
        (res) => {
          console.log('Event added successfully:', res);
          this.eventForm.reset();
        },
        (error) => {
          console.error('Error adding event:', error);
        }
      );
    }
  }

  get f() {
    return this.eventForm.controls;
  }
}
