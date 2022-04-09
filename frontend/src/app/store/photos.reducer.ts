import { PhotosState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  addPhotoFailure,
  addPhotoRequest,
  addPhotoSuccess,
  fetchPhotosFailure,
  fetchPhotosRequest,
  fetchPhotosSuccess,
  removePhotoFailure,
  removePhotoRequest,
  removePhotoSuccess
} from './photos.actions';

const initialState: PhotosState = {
  photos: [],
  fetchLoading: false,
  fetchError: null,
  addLoading: false,
  addError: null,
  removeLoading: null,
  removeError: null
};

export const photosReducer = createReducer(
  initialState,

  on(fetchPhotosRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchPhotosSuccess, (state, { photos }) => ({...state, fetchLoading: false, photos})),
  on(fetchPhotosFailure, (state, { error }) => ({...state, fetchLoading: false, fetchError: error})),

  on(addPhotoRequest, state => ({...state, addLoading: true, addError: null})),
  on(addPhotoSuccess, state => ({...state, addLoading: false})),
  on(addPhotoFailure, (state, { error }) => ({...state, addLoading: false, addError: error})),

  on(removePhotoRequest, (state, { id }) => ({...state, removeLoading: id, removeError: null})),
  on(removePhotoSuccess, state => ({...state, removeLoading: null})),
  on(removePhotoFailure, (state, { error }) => ({...state, removeLoading: null, removeError: error}))
);
