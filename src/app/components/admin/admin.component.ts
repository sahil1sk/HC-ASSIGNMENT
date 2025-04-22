import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatButtonModule } from '@angular/material/button'; 

import { AuthService } from '../../services/auth.service';
import { UserComponent } from '../user/user.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  imports: [
    CommonModule,    
    MatListModule,
    MatTabsModule, 
    MatButtonModule,
    HomeComponent,
    UserComponent
  ],
})
export class AdminComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 