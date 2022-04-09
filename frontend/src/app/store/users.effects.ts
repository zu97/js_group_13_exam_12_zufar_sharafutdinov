import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import {
  facebookLoginUserFailure,
  facebookLoginUserRequest,
  facebookLoginUserSuccess,
  googleLoginUserFailure,
  googleLoginUserRequest,
  googleLoginUserSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { map, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { SocialAuthService } from 'angularx-social-login';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { fetchPhotosRequest } from './photos.actions';

@Injectable()
export class UsersEffects {

  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<AppState>,
    private authService: SocialAuthService,
    private usersService: UsersService,
    private helpersService: HelpersService,
  ) {
  }

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map((user) => registerUserSuccess({user})),
      tap(() => {
        this.helpersService.openSnackBar('User is registered');
        void this.router.navigate(['/']);
      }),
      this.helpersService.catchServerError(registerUserFailure)
    )),
  ));

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.loginUser(userData).pipe(
      map((user) => loginUserSuccess({user})),
      tap(() => {
        this.helpersService.openSnackBar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpersService.catchServerError(loginUserFailure),
    )),
  ));

  facebookLoginUser = createEffect(() => this.actions.pipe(
    ofType(facebookLoginUserRequest),
    mergeMap(({userData}) => this.usersService.facebookLogin(userData).pipe(
      map((user) => facebookLoginUserSuccess({user})),
      tap(() => {
        this.helpersService.openSnackBar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpersService.catchServerError(facebookLoginUserFailure),
    )),
  ));

  googleLoginUser = createEffect(() => this.actions.pipe(
    ofType(googleLoginUserRequest),
    mergeMap(({userData}) => this.usersService.googleLogin(userData).pipe(
      map((user) => googleLoginUserSuccess({user})),
      tap(() => {
        this.helpersService.openSnackBar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpersService.catchServerError(googleLoginUserFailure),
    )),
  ));

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => this.usersService.logoutUser().pipe(
      map(() => logoutUser()),
      tap(() => {
        void this.router.navigate(['/']);
        void this.authService.signOut();
        this.store.dispatch(fetchPhotosRequest({}));
        this.helpersService.openSnackBar('Logout successful');
      }),
    )),
  ));

}
