import { Component } from '@angular/core';

class SignIn {
  public email: String;
  public password: String;
  public extended: Boolean = false;
}

class SignUp {
  public name: String;
  public email: String;
  public password: String;
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
export class AppComponent {
  public title: String = 'RETOCA\'Mmmm';
  public subtitle: String = 'Festa de la Percussió de Les Corts';
  public year: String = '2017';
  public loginForm: Boolean = true;
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

  constructor() {
    this.signIn = new SignIn();
    this.signUp = new SignUp();
  }

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

  public changeBurgerType() {
    if (this.signUp.eatType === 'veggy') {
      let index = this.signUp.burgerIngredients.indexOf('bacon');

      if (index !== -1) {
        this.signUp.burgerIngredients.splice(index, 1);
      }
    }
  }

  public changeBurgerIngredients(event) {
    if (this.signUp.burgerIngredients.length >= 3) {
      event.target.checked = false;
      let index = this.signUp.burgerIngredients.indexOf(event.target.value);

      if (index !== -1) {
        this.signUp.burgerIngredients.splice(index, 1);
      }
    } else {
      if (event.target.checked) {
        this.signUp.burgerIngredients.push(event.target.value);
      } else {
        let index = this.signUp.burgerIngredients.indexOf(event.target.value);

        if (index !== -1) {
          this.signUp.burgerIngredients.splice(index, 1);
        }
      }
    }
  }

  public sendSignInForm(event) {
    event.preventDefault();

    console.log(this.signIn);
  }

  public sendSignUpForm(event) {
    event.preventDefault();

    console.log(this.signUp);
  }
}
