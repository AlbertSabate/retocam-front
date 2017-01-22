import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ApiService } from './services/api.service';

import { groups } from './constants/groups';

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

  public groups: Array<String>;
  public group: String;

  public userId: String;
  public user: Object;
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

    this.groups = Object.keys(groups).map((key) => {
      return groups[key];
    });

    const hash = window.location.pathname.substring(1);
    this.group = groups[hash];
    if (hash === 'admin') {
      this.loginForm = true;
    } else if (typeof this.group === 'undefined') {
      document.getElementsByTagName('body')[0].remove();
      window.location.href = 'http://diablesdelescorts.cat/';
    }
  }

  ngOnInit() {
    this.loadUsers();
  }

  public isLoggedIn(): Boolean {
    return (localStorage.getItem('token')) ? true : false;
  }

  public loadUsers() {
    const that = this;

    this.api.getUsers(this.group).subscribe(
      users => {
        that.users = users;

        that.loading = false;
      },
      error => {
        that.notify.error(error.message);
        this.loading = false;
      }
    );
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

  public logout() {
    localStorage.removeItem('token');
  }

  public createNew() {
    this.user = undefined;
    this.group = undefined;
  }

  public getUser(userId: String) {
    const that = this;

    this.api.getUser(userId).subscribe(
      response => {
        if (response.message === 'USER_NOT_FOUND') {
          that.notify.success('L\'Usuari no existeix!');
        } else if (response.message === 'UNAUTHORIZED') {
          that.notify.success('No tens permisos');
        } else {
          that.user = response;
          that.group = response.group;
        }
      },
      error => {
        that.notify.success('Uppss! No s\'ha pogut carregar l\'usuari');
      }
    );
  }
}
