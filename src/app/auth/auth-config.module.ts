import { NgModule } from '@angular/core';
import { AuthModule, LogLevel  } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
              authority: 'https://europe-west6-starthub-schaffhausen.cloudfunctions.net/api/oidc',
              redirectUrl: window.location.origin + '/return',
              postLogoutRedirectUri: window.location.origin,
              clientId: 'eidcheckApp',
              scope: 'openid email profile address', // 'openid profile offline_access ' + your scopes
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              logLevel: LogLevel.Debug,
          }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
