import { Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { Chat } from './chat/chat';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

export const routes: Routes = [
    {
        path: 'welcome',
        component: Welcome
    },
    {
        path: '',
        component: Chat,
        canActivate: [ () => inject(AuthService).refuseGuestAccess() ]
    }
];
