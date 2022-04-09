import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';

const reducers = {
  users: usersReducer
};

const effects = [
  UsersEffects
];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule { }
