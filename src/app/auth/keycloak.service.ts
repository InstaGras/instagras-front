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
    getUserProfile(): any {
         const  userProfile = {
             username : this.keycloakAuth.idTokenParsed.preferred_username,
             email : this.keycloakAuth.idTokenParsed.email,
             name : this.keycloakAuth.idTokenParsed.name,
             given_name : this.keycloakAuth.idTokenParsed.given_name,
             family_name : this.keycloakAuth.idTokenParsed.family_name
         };
         if(userProfile.email==null){
            userProfile.email='Non renseigné';
         }
         return userProfile;
    }
    isAuthentificated(): boolean {
        return this.keycloakAuth.authenticated;
    }
}
