import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ApiService } from '../../services/api.service';

import { SignUp } from '../../forms/sign-up';

import { burgerTypes } from '../../constants/burger-types';
import { drinks } from '../../constants/drinks';
import { ingredients } from '../../constants/ingredients';

@Component({
  selector: 'app-burger-form',
  templateUrl: './burger-form.component.html',
  styleUrls: ['./burger-form.component.scss']
})
export class BurgerFormComponent {
  @Output() loginForm: EventEmitter<any> = new EventEmitter();
  public signUp: SignUp;

  public burgerTypes: Array<Object>;
  public ingredients: Array<Object>;
  public drinks: Array<Object>;

  constructor(
    private api: ApiService,
    private vRef: ViewContainerRef,
    private notify: ToastsManager
  ) {
    this.notify.setRootViewContainerRef(vRef);
    this.signUp = new SignUp();
    this.burgerTypes = burgerTypes;
    this.drinks = drinks;
    this.ingredients = ingredients;
  }

  public changeBurgerType() {
    if (this.signUp.eatType === 'veggy') {
      this.signUp.burgerIngredients = [];
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

  public sendSignUpForm() {
    this.api.createUserApiRequest(this.signUp).subscribe(
      response => {
        if (response.message === 'USER_CREATED') {
          this.notify.success('BURGER GUARDADA CORRECTAMENT!');
        } else if (response.message === 'NAME_REQUIRED') {
          this.notify.error('Has d\'escriure el teu nom!');
        } else {
          this.notify.error(response.message);
        }
      },
      error => {
        this.notify.error('Error al guardar la teva burger! :(');
      }
    );
  }

  public showSignIn() {
    this.loginForm.emit();
  }
}
