import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideAnimation = trigger('slideInOut', [
  state(
    'in',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),
  state(
    'out',
    style({
      transform: 'translate3d(100%, 0, 0)',
    })
  ),
  transition('in => out', animate('400ms ease-in-out')),
  transition('out => in', animate('400ms ease-in-out')),
]);

export const fadeAnimation = trigger('fade', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate('400ms ease-in-out', style({ opacity: 0.3 })),
  ]),
  transition('* => void', [
    animate('400ms ease-in-out', style({ opacity: 0 })),
  ]),
]);
