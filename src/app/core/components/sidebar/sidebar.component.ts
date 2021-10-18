import { Component, OnInit } from '@angular/core';
import { faMapMarkedAlt, faThLarge, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface SidebarItem {
  icon: IconDefinition;
  title: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  items: SidebarItem[] = [
    { icon: faThLarge, title: 'Categories', link: 'categories' },
    { icon: faMapMarkedAlt, title: 'Locations', link: 'locations' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
