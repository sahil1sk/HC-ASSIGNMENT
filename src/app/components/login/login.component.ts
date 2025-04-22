import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  isLoading = signal(false);
  loginError = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    if (this.email() && this.password()) {
      this.isLoading.set(true);
      this.loginError.set('');

      try {
        const success = await this.authService.login(this.email(), this.password());
        if (success) {
          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.loginError.set('Invalid email or password');
        }
      } catch (error) {
        this.loginError.set('An error occurred during login');
      } finally {
        this.isLoading.set(false);
      }
    }
  }
} 