import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { SignIn } from '../forms/sign-in';
import { SignUp } from '../forms/sign-up';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  private options: RequestOptions;

  constructor(
    private http: Http
  ) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: headers });
  }

  public createUserApiRequest(signUp: SignUp): Observable<any> {
    return this.http.post(environment.apiUrl + 'users', JSON.stringify(signUp), this.options)
      .map((response: Response) => {
        const body = response.json();

        return body || { };
      })
      .catch(this.handleError);
  }

  public authUserApiRequest(signIn: SignIn): Observable<any> {
    return this.http.post(environment.apiUrl + 'authenticate', JSON.stringify(signIn), this.options)
      .map((response: Response) => {
        const body = response.json();

        return body || { };
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
