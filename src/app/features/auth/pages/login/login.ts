import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  hidePassword = true;
  private authWindow: Window | null = null;
  private messageListener!: (event: MessageEvent) => void;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.messageListener = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:3000') {
        return;
      }
      
      const { accessToken, refreshToken } = event.data;
      if (accessToken && refreshToken) {
        this.authService.saveTokens({ accessToken, refreshToken });
        this.router.navigate(['/dashboard']);
        if (this.authWindow) {
            this.authWindow.close();
            this.authWindow = null;
        }
      }
    };
    window.addEventListener('message', this.messageListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.messageListener);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.saveTokens(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          if (error.error.message === 'Invalid credentials') {
            this.errorMessage = 'E-mail ou senha inválidos.';
          } else {
            this.errorMessage = 'Ocorreu um erro no servidor.';
          }
        }
      });
    }
  }

  loginWithGoogle(): void {
    const windowName = 'GoogleAuth';
    const windowFeatures = 'width=600,height=600,scrollbars=yes';
    this.authWindow = window.open('http://localhost:3000/auth/google', windowName, windowFeatures);
  }
}