import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  template: `<router-outlet />`,
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App {}
