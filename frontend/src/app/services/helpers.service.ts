import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActionType } from '@ngrx/store';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
    private snackBar: MatSnackBar,
  ) {}

  openSnackBar(message: string, action?: string, config?: MatSnackBarConfig) {
    if (!action) {
      action = 'OK';
    }

    if (!config || !config.duration) {
      config = {...config, duration: 3000};
    }

    return this.snackBar.open(message, action, config);
  }

  catchServerError(action: ActionType<any>) {
    return catchError((reqError) => {
      let error = null;

      if (reqError instanceof HttpErrorResponse && reqError.status === 400) {
        error = reqError.error;
      } else {
        this.openSnackBar('Server error');
      }

      return of(action({error}));
    });
  }

}
