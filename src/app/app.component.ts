import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';

import Chart from 'chart.js/auto';

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
  title = 'app';
  showUserForm = false;

  openUserForm() {
    this.showUserForm = true;
  }

  users: any = [
    {
      name: '',
      role: 'Admin',
      email: '',
    },
  ];

  chart: any = [];

  getRoleNumber(role: any) {
    return this.users.filter((user: any) => user.role === role).length;
  }

  ngAfterViewInit() {
    const interval = setInterval(() => {
      const marker = document.getElementById('after-defer-marker');
      if (marker) {
        clearInterval(interval);
        this.initiateChart();
      }
    }, 50);
  }

  ngOnInit() {
    this.initiateChart();
  }

  initiateChart() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [
          {
            label: 'Distribution of roles',
            data: [
              this.getRoleNumber('Admin'),
              this.getRoleNumber('Editor'),
              this.getRoleNumber('Viewer'),
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
