import { animate, style, transition, trigger } from '@angular/animations';

export const formControlErrorsAnimations = {
  fadeInOut: trigger('fadeInOut', [
    transition('void => *', [
      style({ opacity: 0, transform: 'translateY(-25%)' }),
      animate('0.25s cubic-bezier(0.2, 0, 0, 1)'),
    ]),
    transition('* => void', [
      animate(
        '0.25s cubic-bezier(0.2, 0, 0, 1)',
        style({ height: '0px', opacity: 0, overflow: 'hidden' })
      ),
    ]),
  ]),
};
