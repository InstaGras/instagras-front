import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {KeycloakService} from './keycloak.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public keyCloakService: KeycloakService, public router: Router) {}

    canActivate(): boolean {
        if (!this.keyCloakService.isAuthentificated()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }

}
