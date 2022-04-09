import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUserRequest } from '../../store/users.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user: Observable<null | User>;
  apiUrl = environment.apiUrl;

  constructor(
    private store: Store<AppState>
  ) {
    this.user = store.select(state => state.users.user);
  }

  logout() {
    this.store.dispatch(logoutUserRequest());
  }
}
