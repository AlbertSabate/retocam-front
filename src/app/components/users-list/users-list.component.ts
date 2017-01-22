import { Component, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() isLoggedIn: Boolean;
  @Input() users: Array<Object>;
  @Output() getUser: EventEmitter<any> = new EventEmitter();
  @Output() loadUsers: EventEmitter<any> = new EventEmitter();

  constructor(
    private api: ApiService,
    private vRef: ViewContainerRef,
    private notify: ToastsManager
  ) {
    this.notify.setRootViewContainerRef(vRef);
  }

  changeUser(userId: String) {
    this.getUser.emit(userId);
  }

  deleteUser(userId: String) {
    const that = this;

    const confirmation = confirm('Ep! Això esborra les dades, segur?');
    if (confirmation === true) {
      this.api.deleteUser(userId).subscribe(
        response => {
          if (response.message === 'REMOVED') {
            that.notify.success('Usuari eliminat!');
            that.loadUsers.emit();
          } else {
            that.notify.success('Uppss! No s\'ha pogut esborrar');
          }
        },
        error => {
          that.notify.success('Uppss! No s\'ha pogut esborrar');
        }
      );
    }
  }

  exportUsers() {
    this.notify.info('Upss!! Encara no funciono! :D');
  }
}
