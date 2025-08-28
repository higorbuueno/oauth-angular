import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user/user.service';
import { GoogleApiService } from './services/google-api/google-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('oauth-angular');
  private _googleApiService = inject(GoogleApiService);

  ngOnInit(): void {
    this._googleApiService.validateLoggedUser();
  }
}
