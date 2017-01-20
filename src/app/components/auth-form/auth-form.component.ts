import { Component, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ApiService } from '../../services/api.service';

import { SignIn } from '../../forms/sign-in';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  @Output() loginForm: EventEmitter<any> = new EventEmitter();
  public signIn: SignIn;

  constructor(
    private api: ApiService,
    private vRef: ViewContainerRef,
    private notify: ToastsManager
  ) {
    this.notify.setRootViewContainerRef(vRef);
    this.signIn = new SignIn();
  }

  public sendSignInForm() {
    this.api.authUserApiRequest(this.signIn).subscribe(
      response => {
        if (response.message === 'INVALID_PASSWORD') {
          this.notify.error('Error al validar-te');
        } else if (response.message === 'AUTH_SUCCESS') {
          this.notify.success('Validat correctament');
          localStorage.setItem('token', response.token);
        } else {
          this.notify.error(response.message);
        }
      },
      error => {
        this.notify.error('Error al validar-te');
      }
    );
  }

  public showSignUp() {
    this.loginForm.emit(null);
  }
}
