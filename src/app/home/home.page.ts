import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpHeaders
} from '@angular/common/http';
import {
  OidcClientNotification,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult
} from 'angular-auth-oidc-client';
import {
  Observable
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  configuration: OpenIdConfiguration;
  userDataChanged$: Observable < OidcClientNotification < any >> ;
  userData$: Observable < UserDataResult > ;
  isAuthenticated = false;

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.configuration = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.isAuthenticated$.subscribe(({
      isAuthenticated
    }) => {
      this.isAuthenticated = isAuthenticated;

      console.warn('authenticated: ', isAuthenticated);
    });


    this.activatedRoute.queryParams.subscribe(params => {
      const code = params.code;
      const state = params.state;

      console.log(code);

    });

  }

  login() {
    this.oidcSecurityService.authorize();
  }

  refreshSession() {
    this.oidcSecurityService.forceRefreshSession().subscribe((result) => console.log(result));
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  logoffAndRevokeTokens() {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }

  revokeRefreshToken() {
    this.oidcSecurityService.revokeRefreshToken().subscribe((result) => console.log(result));
  }

  revokeAccessToken() {
    this.oidcSecurityService.revokeAccessToken().subscribe((result) => console.log(result));
  }
}
