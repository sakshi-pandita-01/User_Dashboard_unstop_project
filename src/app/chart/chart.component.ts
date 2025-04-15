import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import Chart from 'chart.js/auto';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  template: `<canvas #chartCanvas></canvas>`,
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private allUserService: UserService) {}

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Admin', 'Editor', 'Viewer'],
          datasets: [
            {
              label: 'Distribution of roles',
              data: [
                this.allUserService.getRoleNumber('admin'),
                this.allUserService.getRoleNumber('editor'),
                this.allUserService.getRoleNumber('viewer'),
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }
}
