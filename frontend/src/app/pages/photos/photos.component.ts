import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Photo, PhotoError } from '../../models/photo.model';
import { fetchPhotosRequest } from '../../store/photos.actions';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  photos: Observable<Photo[]>;
  fetchLoading: Observable<boolean>;
  fetchError: Observable<null | PhotoError>;

  isOwnerPage = false;

  loginUserId = '';
  viewUserId = '';

  private userSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.user = store.select((state) => state.users.user);
    this.photos = store.select((state) => state.photos.photos);
    this.fetchLoading = store.select((state) => state.photos.fetchLoading);
    this.fetchError = store.select((state) => state.photos.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = <undefined | string>params['id'];

      if (id) {
        this.viewUserId = id;
        this.isOwnerPage = this.loginUserId === this.viewUserId;
      } else {
        this.isOwnerPage = false;
      }

      this.fetchPhotos();
    });

    this.userSub = this.user.subscribe((user) => {
      const id = user ? user._id : '';

      if (id) {
        this.loginUserId = id;
        this.isOwnerPage = this.loginUserId === this.viewUserId;
      } else {
        this.isOwnerPage = false;
      }
    });
  }

  fetchPhotos(): void {
    this.store.dispatch(fetchPhotosRequest({ id: this.viewUserId }));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
