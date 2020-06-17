import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../sso.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData: any;
  constructor(private oauthService: OAuthService, private router: Router) {
    this.configureSSO();
  }
  ngOnInit() { }

  configureSSO() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  Login() {
    this.oauthService.initImplicitFlow();

  }
  Logout() {
    this.oauthService.logOut();
  }
  get token() {
    let claims: any = this.oauthService.getIdentityClaims();
    this.userData = claims ? claims : null;
    return claims ? claims : null;
  }

}
