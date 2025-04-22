import { Injectable, signal } from '@angular/core';

export interface User {
  email: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  public currentUser = this.currentUserSignal.asReadonly();

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSignal.set(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (email && password) {
        const user: User = {
          email: email,
          role: email.includes('admin') ? 'admin' : 'user'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSignal.set(user);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSignal() !== null;
  }

  isAdmin(): boolean {
    return this.currentUserSignal()?.role === 'admin';
  }
} 