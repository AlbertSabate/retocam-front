import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { BurgerFormComponent } from './components/burger-form/burger-form.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { LoadingComponent } from './components/loading/loading.component';

import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    BurgerFormComponent,
    AuthFormComponent,
    UsersListComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastModule
  ],
  providers: [
    Title,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
