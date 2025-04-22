import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserListComponent } from '../user-list/user-list.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  imports: [
    UserListComponent,
    UserProfileComponent,
  ]
})
export class UserComponent{
  selectedUser: User | undefined;
}
