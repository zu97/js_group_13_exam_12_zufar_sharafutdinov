import { LoginError, RegisterError, User } from '../models/user.model';
import { AddError, Photo } from '../models/photo.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  fbLoginLoading: boolean,
  googleLoginLoading: boolean,
  loginError: null | LoginError
};

export type PhotosState = {
  photos: Photo[],
  fetchLoading: boolean,
  fetchError: null | string,
  addLoading: boolean,
  addError: null | AddError,
  removeLoading: null | string,
  removeError: null | string
};

export type AppState = {
  users: UsersState,
  photos: PhotosState
};
