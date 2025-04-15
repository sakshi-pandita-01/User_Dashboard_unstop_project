import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { User, UserService } from './shared/user.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';

import Chart from 'chart.js/auto';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    UserDashboardComponent,
    UserFormComponent,
    CommonModule,
    ChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  constructor(private allUserService: UserService) {
    this.allUsers$ = this.allUserService.data$;
  }
  title = 'app';
  showUserForm = false;

  allUsers$: Observable<User[]> = of([]);

  openUserForm() {
    this.showUserForm = true;
  }

  chart: any = [];

  ngAfterViewInit() {}

  ngOnInit() {
    this.allUsers$ = this.allUserService.data$;
  }

  addNewUser(user: any) {
    this.allUserService.updateUsers(user);
  }
}
