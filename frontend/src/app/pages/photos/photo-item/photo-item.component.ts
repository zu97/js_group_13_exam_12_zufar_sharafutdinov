import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Photo, PhotoError } from '../../../models/photo.model';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PhotoModalComponent } from '../../../ui/photo-modal/photo-modal.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { removePhotoRequest } from '../../../store/photos.actions';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css']
})
export class PhotoItemComponent implements OnInit, OnDestroy {
  @Input() photo!: Photo;
  @Input() isCanRemove = false;
  @Input() isUserPage = false;
  apiUrl = environment.apiUrl;

  removeLoading: Observable<null | string>;
  removeError: Observable<null | PhotoError>;

  isRemoveLoading = false;

  private removeSub!: Subscription;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
  ) {
    this.removeLoading = store.select((state) => state.photos.removeLoading);
    this.removeError = store.select((state) => state.photos.removeError);
  }

  ngOnInit(): void {
    this.removeSub = this.removeLoading.subscribe((id) => {
      this.isRemoveLoading = this.photo._id === id;
    });
  }

  openImage(): void {
    this.dialog.open(PhotoModalComponent, {
      data: {
        link: this.apiUrl + '/uploads/photos/' + this.photo.image,
        title: this.photo.title
      },
    });
  }

  onRemove(): void {
    if (!this.isCanRemove) {
      return;
    }

    this.store.dispatch(removePhotoRequest({ id: this.photo._id }));
  }

  ngOnDestroy(): void {
    this.removeSub.unsubscribe();
  }

}
