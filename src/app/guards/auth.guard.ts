import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  let user = localStorage.getItem("username");
  if(user){
    return true;
  }
  return router.createUrlTree(['/login']);
};
