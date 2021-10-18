import { Directive, HostBinding } from '@angular/core';

const CARD_HEADER_CLASS_NAME = 'card-header';
const CARD_BODY_CLASS_NAME = 'card-body';

@Directive({
  selector: 'app-card-header',
})
export class CardHeaderDirective {
  @HostBinding('class') className = CARD_HEADER_CLASS_NAME;
}

@Directive({
  selector: 'app-card-body',
})
export class CardBodyDirective {
  @HostBinding('class') className = CARD_BODY_CLASS_NAME;
}
