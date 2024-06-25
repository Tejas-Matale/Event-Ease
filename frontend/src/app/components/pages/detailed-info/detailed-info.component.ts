import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.css']
})
export class DetailedInfoComponent {
  showDropdown: string | null = null;
  @Input() event: any;

  constructor() { }

  toggleDropdown(section: string) {
    this.showDropdown = this.showDropdown === section ? null : section;
  }
}
