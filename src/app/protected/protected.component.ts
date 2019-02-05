import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'oidc-client';


@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styles: []
})
export class ProtectedComponent implements OnInit, AfterViewInit {

  user: User;
  profile: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('  ProtectedComponent ngOnInit this.authService.completeAuthentication()');
    console.log(this.authService.getAuthorizationHeaderValue());
    console.log(this.authService.getClaims());
    console.log('  ProtectedComponent ngOnInit this.authService.completeAuthentication()');
  }

  ngAfterViewInit() {
    this.user = this.authService.getClaims();
    console.log('*****ngAfterViewInit()************************************************');
    console.log(this.user.profile);
  }


}
