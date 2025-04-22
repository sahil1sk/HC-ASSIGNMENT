import { Component, EventEmitter, OnInit, Output, resource, signal, Resource } from '@angular/core';
import { User } from '../../models/user.model';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  imports: [
    MatListModule,
    MatProgressSpinnerModule,
    NgIf,
    NgFor,
  ]
})
export class UserListComponent {
  @Output() userSelected = new EventEmitter<User>();

  query = signal<string>("");
  users!: Resource<User[] | undefined>;

  constructor() {
    this.users = resource<User[], string>({
      request: () => this.query(),
      loader: async ({ request, abortSignal }) => {
        const response = await fetch(`/data.json`, {
          signal: abortSignal,
        });
  
        if (!response.ok) throw new Error("Unable to load users!");
        return (await response.json());
      },
    });
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
  }
}
