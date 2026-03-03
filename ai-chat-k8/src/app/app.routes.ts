import { Routes } from '@angular/router';
import { Chat } from './chat/chat';
import { Welcome } from './welcome/welcome';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

export const routes: Routes = [
    {
        path: '',
        component: Chat,
        canActivate: [ () => inject(AuthService).refuseGuestAccess() ]
    },
    {
        path: 'welcome',
        component: Welcome
    }
];
