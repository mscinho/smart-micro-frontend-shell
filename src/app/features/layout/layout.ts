import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    Header,
    Sidebar
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidebar(): void {
    this.sidenav.toggle();
  }
}