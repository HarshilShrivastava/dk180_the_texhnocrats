import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateService implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, 
    nextState?: RouterStateSnapshot) {
    
      if (nextState.url === '/canview') {
        return true; // bypass checks if we are trying to go to /login
      }
    else{
      console.log(component);
      console.log(currentRoute);
      console.log(currentState);
      console.log(nextState);
       return component.canDeactivate ? component.canDeactivate() : true;
    }
    
  }

  constructor() { }
}
