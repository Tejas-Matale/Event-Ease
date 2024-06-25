import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  @Input() visible = false;
  @Input() notFoundMessage = "Nothing Found!";
  @Input() resetLinkText = "Reset";
  @Input() resetLinkRoute = "/";
  @Output() reset = new EventEmitter<void>();

  onResetClick(): void {
    this.reset.emit();
  }
}
