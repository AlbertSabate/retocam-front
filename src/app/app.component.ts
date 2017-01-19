import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../environments/environment';

class SignIn {
  public email: String;
  public password: String;
  public extended: Boolean = false;
}

class SignUp {
  public name: String;
  public group: String;
  public eatType: String = 'all';
  public burgerIngredients: Array<String> = [];
  public drink: String = 'beer';
  public comments: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading = true;
  public title: String = 'RETOCA\'Mmmm';
  public subtitle: String = 'Festa de la Percussió de Les Corts 2017';
  public year: String = '2017';
  public loginForm: Boolean = false;
  public burgerTypes: Array<Object> = [
    {
      label: 'Carn',
      img: '/assets/img/chicken.svg',
      value: 'all'
    }, {
      label: 'Veggy',
      img: '/assets/img/vegan.svg',
      value: 'veggy'
    }
  ];
  public ingredients: Array<Object> = [
    {
      label: 'Enciam',
      img: '/assets/img/salad.svg',
      value: 'salad',
      isVeggy: true
    }, {
      label: 'Tomàquet',
      img: '/assets/img/tomato.svg',
      value: 'tomato',
      isVeggy: true
    }, {
      label: 'Formatge de Cabra',
      img: '/assets/img/cheese.svg',
      value: 'goatCheese',
      isVeggy: true
    }, {
      label: 'Formatge Emmental',
      img: '/assets/img/cheese.svg',
      value: 'emmentalCheese',
      isVeggy: true
    }, {
      label: 'Ceba',
      img: '/assets/img/onion.svg',
      value: 'onion',
      isVeggy: true
    }, {
      label: 'Bacon',
      img: '/assets/img/bacon.svg',
      value: 'bacon',
      isVeggy: false
    }
  ];
  public drinks: Array<Object> = [
    {
      label: 'Birra',
      img: '/assets/img/beer.svg',
      value: 'beer'
    }, {
      label: 'Coca Cola',
      img: '/assets/img/coca-cola.svg',
      value: 'coca-cola'
    }, {
      label: 'Fanta llimó',
      img: '/assets/img/fanta.svg',
      value: 'lemon-fanta'
    }, {
      label: 'Fanta taronja',
      img: '/assets/img/fanta.svg',
      value: 'orange-fanta'
    }, {
      label: 'Aigua',
      img: '/assets/img/water.svg',
      value: 'water'
    }, {
      label: 'Res',
      img: '/assets/img/nothing.svg',
      value: 'nothing'
    }
  ];

  public signIn: SignIn;
  public signUp: SignUp;
  public users: Array<Object>;

  constructor(
    private http: Http,
    private vRef: ViewContainerRef,
    private toastr: ToastsManager
  ) {
    this.toastr.setRootViewContainerRef(vRef);

    this.signIn = new SignIn();
    this.signUp = new SignUp();
  }

  ngOnInit() {
    this.loading = false;
    // TODO has token in session?
  }

  public isLoggedIn(): Boolean {
    // TODO return real values
    return false;
  }

  public isSignIn(): Boolean {
    return this.loginForm;
  }

  public showSignUp() {
    this.loginForm = false;
  }

  public showSignIn() {
    this.loginForm = true;
  }

  public changeBurgerType() {
    if (this.signUp.eatType === 'veggy') {
      const index = this.signUp.burgerIngredients.indexOf('bacon');

      if (index !== -1) {
        this.signUp.burgerIngredients.splice(index, 1);
      }
    }
  }

  public changeBurgerIngredients(event) {
    if (this.signUp.burgerIngredients.length >= 3) {
      event.target.checked = false;
      const index = this.signUp.burgerIngredients.indexOf(event.target.value);

      if (index !== -1) {
        this.signUp.burgerIngredients.splice(index, 1);
      }
    } else {
      if (event.target.checked) {
        this.signUp.burgerIngredients.push(event.target.value);
      } else {
        const index = this.signUp.burgerIngredients.indexOf(event.target.value);

        if (index !== -1) {
          this.signUp.burgerIngredients.splice(index, 1);
        }
      }
    }
  }

  public sendSignInForm() {
    this.authUserApiRequest().subscribe(
      response => {
        if (response.message === 'INVALID_PASSWORD') {
          this.toastr.error('Error al validar-te');
        } else if (response.message === 'AUTH_SUCCESS') {
          this.toastr.success('Validat correctament');
          localStorage.setItem('token', response.token);
        } else {
          this.toastr.error(response.message);
        }
      },
      error => {
        this.toastr.error('Error al validar-te');
      }
    );
  }

  public sendSignUpForm() {
    this.createUserApiRequest().subscribe(
      response => {
        if (response.message === 'USER_CREATED') {
          this.toastr.success('BURGER GUARDADA CORRECTAMENT!');
        } else if (response.message === 'NAME_REQUIRED') {
          this.toastr.error('Has d\'escriure el teu nom!');
        } else {
          this.toastr.error(response.message);
        }
      },
      error => {
        this.toastr.error('Error al guardar la teva burger! :(');
      }
    );
  }

  private authUserApiRequest(): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(environment.apiUrl + 'authenticate', JSON.stringify(this.signIn), options)
      .map((response: Response) => {
        const body = response.json();

        return body || { };
      })
      .catch(this.handleError);
  }

  private createUserApiRequest(): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(environment.apiUrl + 'users', JSON.stringify(this.signUp), options)
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
