import { Component, inject } from '@angular/core';
import { GoogleApiService } from '../../services/google-api/google-api.service';
import { UserInfo } from '../../interfaces/user-info';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private _googleApiService = inject(GoogleApiService);
  private _userService = inject(UserService);

  login() {
    this._googleApiService.login();
  }

  logout() {
    this._googleApiService.logout();
  }

  get isLogged(): boolean {
    return this._googleApiService.isLoggedIn();
  }

  get userInfo(): UserInfo {
    return this._userService.userInfo;
  }
}
