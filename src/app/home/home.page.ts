import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public oidcSecurityService: OidcSecurityService) {}

  async login(){

    this.oidcSecurityService.authorize();

    const token = this.oidcSecurityService.getAccessToken();
    console.log(token);


  }
}
