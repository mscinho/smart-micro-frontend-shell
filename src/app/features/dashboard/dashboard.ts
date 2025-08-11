import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h2>Bem-vindo ao Dashboard!</h2>
      <p>Você está logado e pode acessar o conteúdo protegido.</p>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class Dashboard {}