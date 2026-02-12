import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface User {
  id: number;
  user: string;
  language: string;
  gameOfChoice: string;
  totalRevenue: number;
  added: string;
  trend: string;
  lastUpdate: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('angular-table-app');
}