import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  public geteIDData(code, token, isWeb, claims) {
    return this.http.post('https://us-central1-eid-check.cloudfunctions.net/geteIDData', {
      authorization_code: code,
      token: token,
      isWeb: isWeb,
      claims: claims
    }, {

    });
  }
  
  public geteIDDataAge(code, token, isWeb) {
    return this.http.post('https://us-central1-eid-check.cloudfunctions.net/geteIDDataAge', {
      authorization_code: code,
      token: token,
      isWeb: isWeb
    }, {

    });
  }
  public geteIDAuthorizationURL(isWeb, claims) {

    const url = 'https://us-central1-eid-check.cloudfunctions.net/geteIDAuthorizationURL?web=' + JSON.stringify(isWeb) + '&claims=' + claims;
    console.log("Call URL: " + url);
    return this.http.get(url);
  }

}