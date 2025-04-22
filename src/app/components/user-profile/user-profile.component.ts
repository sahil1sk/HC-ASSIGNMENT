import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [NgIf]
})
export class UserProfileComponent {
  @Input() user: User | undefined;
}
