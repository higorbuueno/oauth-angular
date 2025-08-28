import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserInfo } from '../../interfaces/user-info';
import { UserService } from '../user/user.service';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: 'xxxx',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(
    public oAuthService: OAuthService,
    private _userService: UserService
  ) {
    oAuthService.configure(oAuthConfig);
  }

  login() {
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this.isLoggedIn()) {
          this.oAuthService.initLoginFlow();
        } else {
          this.configureLoggedUser();
        }
      })
    })
  }

  validateLoggedUser() {
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (this.isLoggedIn()) {
          this.configureLoggedUser();
        }
      })
    })
  }

  configureLoggedUser() {
    this.oAuthService.loadUserProfile().then((userProfile: any) => {
      this._userService.setUserInfo(userProfile.info as UserInfo)
    })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  logout() {
    this.oAuthService.logOut();
  }
}
