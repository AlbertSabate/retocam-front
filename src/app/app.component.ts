import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading = true;
  public loginForm: Boolean = false;

  public name: String = 'Retoca\'Mmmm';
  public org: String = 'Diables de les Corts';
  public title: String = 'Trobada de Percussió de Les Corts';
  public year: Number;

  public users: Array<Object> = [];

  constructor(
    private titleService: Title,
    private api: ApiService,
    private vRef: ViewContainerRef,
    private notify: ToastsManager
  ) {
    this.notify.setRootViewContainerRef(vRef);
    this.year = new Date().getFullYear();
    this.titleService.setTitle( this.title + ' ' + this.year );
  }

  ngOnInit() {
    this.loadUsers();
  }

  public isLoggedIn(): Boolean {
    return (localStorage.getItem('token')) ? true : false;
  }

  public loadUsers() {
    const that = this;

    if (this.isLoggedIn()) {
      this.api.getUsers().subscribe(
        users => {
          if (users.message === 'INVALID_TOKEN') {
            that.notify.error('Ep! L\'autenticació no es vàlida');
          } else if (users.message === 'NO_TOKEN') {
            that.notify.error('No estás validat!');
          } else if (users.message === 'USER_NOT_FOUND') {
            that.notify.error('L\'usuari ja no existeix');
          } else {
            that.users = users;
          }
          that.loading = false;
        },
        error => {
          that.notify.error(error.message);
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }

  public isSignIn(): Boolean {
    return this.loginForm;
  }

  public showSignIn() {
    this.loginForm = true;
  }

  public showSignUp() {
    this.loginForm = false;
  }
}
