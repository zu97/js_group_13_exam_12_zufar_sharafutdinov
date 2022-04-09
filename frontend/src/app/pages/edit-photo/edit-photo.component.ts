import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { addPhotoRequest } from '../../store/photos.actions';
import { Observable } from 'rxjs';
import { AddError } from '../../models/photo.model';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent {
  @ViewChild('f') form!: NgForm;

  addLoading: Observable<boolean>;
  addError: Observable<null | AddError>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.addLoading = store.select((state) => state.photos.addLoading);
    this.addError = store.select((state) => state.photos.addError);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(addPhotoRequest({ photoData: this.form.value }));
  }
}
