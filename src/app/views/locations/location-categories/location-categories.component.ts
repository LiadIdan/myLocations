import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-location-categories',
  templateUrl: './location-categories.component.html',
  styleUrls: ['./location-categories.component.scss'],
})
export class LocationCategoriesComponent {
  @Input() categoryIds!: string[];
}
