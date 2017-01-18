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
    {'all': 'Carn'},
    {'veggy': 'Veggy'}
  ];
  public ingredients: Array<Object> = [
    {'salad': 'Enciam'},
    {'tomato': 'Tomàquet'},
    {'goatCheese': 'Formatge de Cabra'},
    {'emmentalCheese': 'Formatge Emmental'},
    {'onion': 'Ceba'},
    {'bacon': 'Bacon'}
  ];
  public drink: Array<Object> = [
    {'beer': 'Birra'},
    {'coca-cola': 'Coca Cola'},
    {'lemon-fanta': 'Fanta llimó'},
    {'orange-fanta': 'Fanta taronja'},
    {'water': 'Aigua'},
    {'nothing': 'Res'}
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
