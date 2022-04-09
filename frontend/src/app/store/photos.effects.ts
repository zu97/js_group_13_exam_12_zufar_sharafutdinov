import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addPhotoFailure,
  addPhotoRequest,
  addPhotoSuccess, fetchPhotosFailure,
  fetchPhotosRequest,
  fetchPhotosSuccess, removePhotoFailure,
  removePhotoRequest, removePhotoSuccess
} from './photos.actions';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs';
import { PhotosService } from '../services/photos.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { HelpersService } from '../services/helpers.service';

@Injectable()
export class PhotosEffects {

  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<AppState>,
    private photosService: PhotosService,
    private helpersService: HelpersService,
  ) {}

  fetchPhotos = createEffect(() => this.actions.pipe(
    ofType(fetchPhotosRequest),
    mergeMap(({ id }) => this.photosService.fetchPhotos(id).pipe(
      map((photos) => fetchPhotosSuccess({ photos })),
      this.helpersService.catchServerError(fetchPhotosFailure),
    )),
  ));

  addPhotos = createEffect(() => this.actions.pipe(
    ofType(addPhotoRequest),
    mergeMap(({ photoData }) => this.photosService.addPhoto(photoData).pipe(
      map(() => addPhotoSuccess()),
      tap(() => this.router.navigate(['/'])),
      this.helpersService.catchServerError(addPhotoFailure),
    )),
  ));

  removePhoto = createEffect(() => this.actions.pipe(
    ofType(removePhotoRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([data, user]) => {
      const userId = user ? user._id : '';
      return this.photosService.removePhoto(data.id).pipe(
        map(() => removePhotoSuccess()),
        tap(() => this.store.dispatch(fetchPhotosRequest({ id: userId }))),
        this.helpersService.catchServerError(removePhotoFailure),
      );
    }),
  ));

}
