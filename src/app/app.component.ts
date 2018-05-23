import { Component, OnInit } from '@angular/core';
import { Observable,   pipe, fromEvent } from 'rxjs';
import { debounceTime,filter } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  navOpen: boolean;
  minHeight: string;
  private _initWinHeight = 0;

  constructor(private auth: AuthService) {
    // Check for authentication and handle if hash present
    auth.handleAuth();
  }

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200)
      )
      .subscribe((event) => this._resizeFn(event));

    this._initWinHeight = window.innerHeight;
    this._resizeFn(null);
  }

  navToggledHandler(e: boolean) {
    this.navOpen = e;
  }

  private _resizeFn(e) {
    const winHeight: number = e ? e.target.innerHeight : this._initWinHeight;
    this.minHeight = `${winHeight}px`;
  }
}

/*
We'll create a navOpen property to sync the state of the navigation panel with our Header component. This is where we'll store the event data that the Header component sends when the navToggled event is emitted. We'll use a navToggledHandler() method with an $event argument to react to this event.

We'll use an observable fromEvent to subscribe to the window resize event. We can run a _resizeFn() handler that ensures that the height of the layout canvas matches the height of the browser viewport.
*/