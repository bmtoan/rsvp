import { trigger, transition, style, animate, state } from '@angular/animations';

// OPTION 1:
export const expandCollapse = trigger('expandCollapse', [
  state('*', style({
    'overflow-y': 'hidden',
    'height': '*'
  })),
  state('void', style({
    'height': '0',
    'overflow-y': 'hidden'
  })),
  transition('* => void', animate('250ms ease-out')),
  transition('void => *', animate('250ms ease-in'))
]);
/**
 * State *: element is present
State void: element is removed
Transition void => *: element is being added (alias: :enter)
Transition * => void: element is being removed (alias: :leave)
 */