import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styles: []
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('****************************AuthCallbackComponent ngOnInit this.authService.completeAuthentication()');
    this.authService.completeAuthentication();
    // console.log(this.authService.getAuthorizationHeaderValue());
    // console.log(this.authService.getClaims());
    console.log('****************************AuthCallbackComponent ngOnInit this.authService.completeAuthentication()');
  }

}
