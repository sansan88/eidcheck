import { Component,OnInit  } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      console.log('app authenticated', isAuthenticated);
      console.log(`Current access token is '${accessToken}'`);

    });

  }

}
