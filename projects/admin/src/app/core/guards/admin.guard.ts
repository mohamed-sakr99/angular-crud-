import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {

  if ('token' in localStorage) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
