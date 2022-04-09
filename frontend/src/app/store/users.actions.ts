import { createAction, props } from '@ngrx/store';
import {
  LoginError,
  LoginSocialUserData,
  LoginUserData,
  RegisterError,
  RegisterUserData,
  User
} from '../models/user.model';

export const registerUserRequest = createAction(
  '[Users] Register Request',
  props<{userData: RegisterUserData}>()
);
export const registerUserSuccess = createAction(
  '[Users] Register Success',
  props<{user: User}>()
);
export const registerUserFailure = createAction(
  '[Users] Register Failure',
  props<{error: null | RegisterError}>()
);

export const loginUserRequest = createAction(
  '[Users] Login Request',
  props<{userData: LoginUserData}>()
);
export const loginUserSuccess = createAction(
  '[Users] Login Success',
  props<{user: User}>()
);
export const loginUserFailure = createAction(
  '[Users] Login Failure',
  props<{error: null | LoginError}>()
);

export const facebookLoginUserRequest = createAction(
  '[Users] Fb Login Request',
  props<{userData: LoginSocialUserData}>()
);
export const facebookLoginUserSuccess = createAction(
  '[Users] Fb Login Success',
  props<{user: User}>()
);
export const facebookLoginUserFailure = createAction(
  '[Users] Fb Login Failure',
  props<{error: null | LoginError}>()
);

export const googleLoginUserRequest = createAction(
  '[Users] Google Request',
  props<{userData: LoginSocialUserData}>()
);
export const googleLoginUserSuccess = createAction(
  '[Users] Google Success',
  props<{user: User}>()
);
export const googleLoginUserFailure = createAction(
  '[Users] Google Failure',
  props<{error: null | LoginError}>()
);

export const logoutUser = createAction('[Users] Logout');
export const logoutUserRequest = createAction('[Users] Logout Request');
