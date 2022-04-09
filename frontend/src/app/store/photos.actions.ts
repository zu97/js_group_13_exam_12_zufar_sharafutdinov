import { createAction, props } from '@ngrx/store';
import { AddError, AddPhotoData, Photo } from '../models/photo.model';

export const fetchPhotosRequest = createAction('[Photos] Fetch Request', props<{ id?: string }>());
export const fetchPhotosSuccess = createAction('[Photos] Fetch Success', props<{ photos: Photo[] }>());
export const fetchPhotosFailure = createAction('[Photos] Fetch Failure', props<{ error: null | string }>());

export const addPhotoRequest = createAction('[Photos] Add Request', props<{ photoData: AddPhotoData }>());
export const addPhotoSuccess = createAction('[Photos] Add Success');
export const addPhotoFailure = createAction('[Photos] Add Failure', props<{ error: null | AddError }>());

export const removePhotoRequest = createAction('[Photos] Remove Request', props<{ id: string }>());
export const removePhotoSuccess = createAction('[Photos] Remove Success');
export const removePhotoFailure = createAction('[Photos] Remove Failure', props<{ error: null | string }>());
