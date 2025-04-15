import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent {
  @Input() allUsers: Observable<any> = of([]);

  roleMap: { [key: string]: string } = {
    admin: 'Admin',
    editor: 'Editor',
    viewer: 'Viewer',
  };
}
