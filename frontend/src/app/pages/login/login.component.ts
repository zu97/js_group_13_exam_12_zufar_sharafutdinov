import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { LoginError, LoginSocialUserData } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { facebookLoginUserRequest, googleLoginUserRequest, loginUserRequest } from '../../store/users.actions';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  loginLoading: Observable<boolean>;
  facebookLoading: Observable<boolean>;
  googleLoading: Observable<boolean>;
  loginError: Observable<null | LoginError>;

  private authStateSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: SocialAuthService,
  ) {
    this.loginLoading = store.select(state => state.users.loginLoading);
    this.facebookLoading = store.select((state) => state.users.fbLoginLoading);
    this.googleLoading = store.select((state) => state.users.googleLoginLoading);
    this.loginError = store.select(state => state.users.loginError);
  }

  ngOnInit(): void {
    this.authStateSub = this.authService.authState.subscribe((user) => {
      const userData: LoginSocialUserData = {
        authToken: user.authToken,
        id: user.id,
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl
      };

      if (user.provider === 'FACEBOOK') {
        this.store.dispatch(facebookLoginUserRequest({userData}));
      } else if (user.provider === 'GOOGLE') {
        this.store.dispatch(googleLoginUserRequest({userData}));
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(loginUserRequest({ userData: this.form.value }));
  }

  fbLogin(): void {
    void this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleLogin(): void {
    void this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy(): void {
    this.authStateSub.unsubscribe();
  }

}
