import { Component, EventEmitter, Input, Output, ViewContainerRef, OnChanges, OnInit } from '@angular/core';
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
export class BurgerFormComponent implements OnChanges, OnInit {
  @Input() user: any;
  @Input() group: String;
  @Output() loginForm: EventEmitter<any> = new EventEmitter();
  @Output() loadUsers: EventEmitter<any> = new EventEmitter();

  private userId: String;
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

  ngOnInit() {
    this.signUp.burgerIngredients = ['salad', 'tomato', 'cheese', 'bacon'];
  }

  ngOnChanges() {
    if (typeof this.user !== 'undefined') {
      this.userId = this.user._id;

      this.signUp.name = this.user.name;
      this.signUp.eatType = this.user.eatType;
      if (this.user.burgerIngredients) {
        this.signUp.burgerIngredients = this.user.burgerIngredients;
      }
      this.signUp.drink = this.user.drink;
      this.signUp.comments = this.user.comments;

      for (let i = 0; this.signUp.burgerIngredients.length > i; i++) {
        const el = <HTMLInputElement> document.getElementById('check-' + this.signUp.burgerIngredients[i]);
        el.checked = true;
      }
    } else {
      this.resetForm();
    }
  }

  private resetForm() {
    for (let i = 0; this.signUp.burgerIngredients.length > i; i++) {
      const el = <HTMLInputElement> document.getElementById('check-' + this.signUp.burgerIngredients[i]);
      el.checked = false;
    }

    this.signUp = new SignUp();
    this.userId = undefined;
  }

  public changeBurgerType() {
    if (this.signUp.eatType === 'veggy') {
      this.signUp.burgerIngredients = [];
    }
  }

  public changeBurgerIngredients(event) {
    event.target.checked = true;

    /*if (this.signUp.burgerIngredients.length >= 3) {
      event.target.checked = false;
      const index = this.signUp.burgerIngredients.indexOf(event.target.value);

      if (index !== -1) {
        this.signUp.burgerIngredients.splice(index, 1);
      } else {
        this.notify.info('No pots seleccionar més ingredients');
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
    }*/
  }

  public sendSignUpForm() {
    const that = this;

    this.signUp.group = this.group;
    if (!this.userId) {
      this.api.createUserApiRequest(this.signUp).subscribe(
        response => {
          if (response.message === 'USER_CREATED') {
            that.notify.success('BURGER GUARDADA CORRECTAMENT!');
            that.loadUsers.emit();

            that.signUp = new SignUp();
            window.scroll(0, 0);
          } else if (response.message === 'NAME_REQUIRED') {
            this.notify.error('Has d\'escriure el teu nom!');
          } else if (response.message === 'GROUP_REQUIRED') {
            that.notify.error('Has de triar el grup!');
          } else {
            that.notify.error(response.message);
          }
        },
        error => {
          that.notify.error('Error al guardar la teva burger! :(');
        }
      );
    } else {
      this.api.putUser(this.userId, this.signUp).subscribe(
        response => {
          if (response.message === 'USER_UPDATED') {
            that.notify.success('BURGER GUARDADA CORRECTAMENT!');
            that.loadUsers.emit();

            that.resetForm();
            window.scroll(0, 0);
          } else {
            that.notify.error(response.message);
          }
        },
        error => {
          that.notify.error('Error al guardar la teva burger! :(');
        }
      );
    }
  }

  public showSignIn() {
    this.loginForm.emit();
  }
}
