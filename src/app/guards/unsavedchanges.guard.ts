import { CanDeactivateFn } from '@angular/router';


export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const unsavedchangesGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
