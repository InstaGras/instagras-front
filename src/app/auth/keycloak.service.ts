import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  constructor() { }
  private keycloakAuth: any;

     logout(): void {
        this.keycloakAuth.logout().success(() => {
            this.keycloakAuth.loggedIn = false;
            this.keycloakAuth.authz = null;
        });
    }


    init(): Promise<any> {
        return new Promise((resolve, reject) => {
            const config = {
                url: environment.keycloak.url,
                realm: environment.keycloak.realm,
                clientId: environment.keycloak.clientId
            };
            this.keycloakAuth = new Keycloak(config);
            this.keycloakAuth.init({ onLoad: 'login-required' })
                .success(() => {
                    this.keycloakAuth.loggedIn = true;
                    resolve();
                })
                .error(() => {
                    reject();
                });
        });
    }
    getToken(): string {
        return this.keycloakAuth.token;
    }
    getFullName(): string {
        return this.keycloakAuth.tokenParsed.name;
    }
}
