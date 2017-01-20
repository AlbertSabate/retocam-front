import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

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
  public title: String = 'Festa de la Percussió de Les Corts';
  public year: String = '2017';

  constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle( this.title + ' ' + this.year );
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

  public showSignIn() {
    this.loginForm = true;
  }

  public showSignUp() {
    this.loginForm = false;
  }
}
