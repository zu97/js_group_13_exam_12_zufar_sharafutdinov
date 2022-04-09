import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/types';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { logoutUser } from './store/users.actions';
import { HelpersService } from './services/helpers.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user: Observable<null | User>;
  token: null | string = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private helpersService: HelpersService,
  ) {
    this.user = store.select(state => state.users.user);
    this.user.subscribe((user) => {
      this.token = user ? user.token : null;
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token) {
      request = request.clone({
        setHeaders: { 'Authorization': this.token }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.helpersService.openSnackBar('Internet error');
        }

        if (error.status === 401) {
          this.store.dispatch(logoutUser());
          void this.router.navigate(['/']);
        }

        return throwError(() => error);
      }),
    );
  }
}
