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
  constructor(
    private http: Http
  ) { }

  private getOptions() {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) {
      headers['X-Access-Token'] = token;
    }

    return new RequestOptions({ headers: new Headers(headers) });
  }

  public createUserApiRequest(signUp: SignUp): Observable<any> {
    return this.http.post(environment.apiUrl + 'users', JSON.stringify(signUp), this.getOptions())
      .map((response: Response) => {
        const body = response.json();

        return body || { };
      })
      .catch(this.handleError);
  }

  public authUserApiRequest(signIn: SignIn): Observable<any> {
    return this.http.post(environment.apiUrl + 'authenticate', JSON.stringify(signIn), this.getOptions())
      .map((response: Response) => {
        const body = response.json();

        return body || { };
      })
      .catch(this.handleError);
  }

  public getUsers(): Observable<any> {
    return this.http.get(environment.apiUrl + 'users', this.getOptions())
      .map((response: Response) => {
        const body = response.json();

        return body || { };
      })
      .catch(this.handleError);
  }

  public getUser(userId: String): Observable<any> {
    return this.http.get(environment.apiUrl + 'users/' + userId, this.getOptions())
      .map((response: Response) => {
        const body = response.json();

        return body || { };
      })
      .catch(this.handleError);
  }

  public putUser(userId: String): Observable<any> {
    return this.http.put(environment.apiUrl + 'users/' + userId, this.getOptions())
      .map((response: Response) => {
        const body = response.json();

        return body || { };
      })
      .catch(this.handleError);
  }

  public deleteUser(userId: String): Observable<any> {
    return this.http.delete(environment.apiUrl + 'users/' + userId, this.getOptions())
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
