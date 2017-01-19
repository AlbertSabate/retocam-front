import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: String = 'RETOCA\'Mmmm';
  public subtitle: String = 'Festa de la Percussió de Les Corts';
  public year: String = '2017';
  public loginForm: Boolean = true;
  public burguerTypes: Array<Object> = [
    {
      'label': 'Carn',
      'img': '/assets/img/chicken.svg',
      'value': 'all'
    }, {
      'label': 'Veggy',
      'img': '/assets/img/vegan.svg',
      'value': 'veggy'
    }
  ];
  public ingredients: Array<Object> = [
    {
      'label': 'Enciam',
      'img': '/assets/img/salad.svg',
      'value': 'salad'
    }, {
      'label': 'Tomàquet',
      'img': '/assets/img/tomato.svg',
      'value': 'tomato'
    }, {
      'label': 'Formatge de Cabra',
      'img': '/assets/img/cheese.svg',
      'value': 'goatCheese'
    }, {
      'label': 'Formatge Emmental',
      'img': '/assets/img/cheese.svg',
      'value': 'emmentalCheese'
    }, {
      'label': 'Ceba',
      'img': '/assets/img/onion.svg',
      'value': 'onion'
    }, {
      'label': 'Bacon',
      'img': '/assets/img/bacon.svg',
      'value': 'bacon'
    }
  ];
  public drinks: Array<Object> = [
    {
      'label': 'Birra',
      'img': '/assets/img/beer.svg',
      'value': 'beer'
    }, {
      'label': 'Coca Cola',
      'img': '/assets/img/coca-cola.svg',
      'value': 'coca-cola'
    }, {
      'label': 'Fanta llimó',
      'img': '/assets/img/fanta.svg',
      'value': 'lemon-fanta'
    }, {
      'label': 'Fanta taronja',
      'img': '/assets/img/fanta.svg',
      'value': 'orange-fanta'
    }, {
      'label': 'Aigua',
      'img': '/assets/img/water.svg',
      'value': 'water'
    }, {
      'label': 'Res',
      'img': '/assets/img/nothing.svg',
      'value': 'nothing'
    }
  ];

  public isLoggedIn(): Boolean {
    return false;
  }

  public isSignIn(): Boolean {
    return this.loginForm;
  }

  public showSignUp(event) {
    event.preventDefault();

    this.loginForm = false;
  }

  public showSignIn(event) {
    event.preventDefault();

    this.loginForm = true;
  }

  public sendSignInForm(event) {
    event.preventDefault();
  }

  public sendSignUpForm(event) {
    event.preventDefault();
  }
}
