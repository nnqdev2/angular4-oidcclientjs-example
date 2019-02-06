import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User, WebStorageStateStore } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(getClientSettings());
  private user: User = null;

  private isLustAdmin: boolean;
  private isLustProjectManager: boolean;
  private isOlprrReview: boolean;

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    console.log('*************************************AuthService isLoggedIn() this.user');
    console.log(this.user);
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    console.log('**************AuthService getClaims() this.user.profile ====>');
    console.log(JSON.stringify(this.user.profile));
    return this.user.profile;
  }

  getAccessToken(): string {
    return this.user ? this.user.access_token : '';
  }

  getIdToken(): string {
    return this.user ? this.user.id_token : '';
  }

  getProfile(): any {
    return this.user ? this.user.profile : '';
  }

  getAuthorizationHeaderValue(): string {
    console.log('AuthService getAuthorizationHeaderValue()');
    console.log(`${this.user.token_type} ${this.user.access_token}`);
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    console.log('AuthService startAuthentication()');
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    console.log('################################AuthService completeAuthentication()  starts');
    return this.manager.signinRedirectCallback().then(user => {
      console.log('################################AuthService completeAuthentication()');
      console.log('###################this.user before this.manager.signinRedirectCallback()');
      console.log(this.user);
      this.user = user;
      console.log('###################this.user returned from this.manager.signinRedirectCallback()');
      console.log(this.user);
      // console.log('###################this.user returned from this.manager.signinRedirectCallback() id and access token');
      // console.log(this.user.id_token);
      // console.log(this.user.access_token);
      // console.log('###################this.user returned from this.manager.signinRedirectCallback() profile');
      // console.log(this.user.profile.amr);
      // console.log(this.user.profile.idp);
      // console.log(this.user.profile.name);
      console.log(this.user.profile.role);
      const roleArray: string[] = this.user.profile.role;
      console.log(roleArray);
      console.log(this.user.profile.role.includes('DEQ\\LustAdmin'));
      console.log(roleArray.includes('DEQ\\LustAdmin'));
      console.log(this.user.profile.role.indexOf('DEQ\\LustAdmin'));
      console.log(roleArray.indexOf('DEQ\\LustAdmin'));
      console.log(this.user.profile.role[1]);
      // console.log('#################################localStorage.getItem       HELLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
      // console.log(JSON.parse(localStorage.getItem('oidc.user:http://localhost:5555/:angular_spa')));
      // console.log(JSON.parse(localStorage.getItem('oidc.user:http://localhost:44317/:angular_spa')));
    });
  }

  isLustAdminRole(): boolean {
    return this.isLustAdmin;
  }

  isLustProjectManagerRole(): boolean {
    return this.isLustProjectManager;
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://localhost:44317/',
    // authority: 'http://localhost:5555/',
    // client_id: 'angular_spa',
    client_id: 'angular_spa2',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'id_token token',
    scope: 'openid profile',
    filterProtocolClaims: true,
    loadUserInfo: true,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  };
}
