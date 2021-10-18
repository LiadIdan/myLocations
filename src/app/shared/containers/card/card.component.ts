import { Component, HostBinding } from '@angular/core';

const CARD_CLASS_NAME = 'card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @HostBinding('class') className = CARD_CLASS_NAME;
}
