import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('*****************AuthGuardService canActivate() User is logged in ' );
      console.log('*****************AuthGuardService canActivate() this.authService.getClaims()? ' );
      console.log(this.authService.getClaims());
      console.log('*****************AuthGuardService canActivate() localStorage.getItem' );
      console.log(JSON.parse(localStorage.getItem('oidc.user:http://localhost:5555/:angular_spa')));
      return true;
    }
    console.log('*****************AuthGuardService canActivate() user not logged in  this.authService.startAuthentication()');
    this.authService.startAuthentication();
    return false;
  }
}
