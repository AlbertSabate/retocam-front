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
  @Output() loadUsers: EventEmitter<any> = new EventEmitter();
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
    const that = this;

    this.api.authUserApiRequest(this.signIn).subscribe(
      response => {
        if (response.message === 'INVALID_PASSWORD') {
          that.notify.error('Error al validar-te');
        } else if (response.message === 'EMAIL_REQUIRED') {
          that.notify.error('El camp Email és obligatori');
        } else if (response.message === 'USER_NOT_FOUND') {
          that.notify.error('No estás registrat!');
        } else if (response.message === 'AUTH_SUCCESS') {
          that.notify.success('Validat correctament');
          localStorage.setItem('token', response.token);

          that.loadUsers.emit();
        } else {
          that.notify.error(response.message);
        }
      },
      error => {
        that.notify.error('Error al validar-te');
      }
    );
  }

  public showSignUp() {
    this.loginForm.emit();
  }
}
