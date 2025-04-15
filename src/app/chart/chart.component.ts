import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import Chart from 'chart.js/auto';
import { combineLatest, Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-chart',
  template: `<canvas #chartCanvas></canvas>`,
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart!: Chart; // Declare chart instance

  // Role counts as observables
  adminCount$!: Observable<number>;
  editorCount$!: Observable<number>;
  viewerCount$!: Observable<number>;

  constructor(private allUserService: UserService) {}

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [
          {
            label: 'Distribution of roles',
            data: [0, 0, 0],
            borderWidth: 1,
          },
        ],
      },
    });

    // Subscribe to the role counts
    this.adminCount$ = this.allUserService.getRoleNumber('admin');
    this.editorCount$ = this.allUserService.getRoleNumber('editor');
    this.viewerCount$ = this.allUserService.getRoleNumber('viewer');

    // Combine the observables to update the chart data
    combineLatest([
      this.adminCount$,
      this.editorCount$,
      this.viewerCount$,
    ]).subscribe(([adminCount, editorCount, viewerCount]) => {
      this.updateChartData(adminCount, editorCount, viewerCount);
    });
  }

  // Method to update chart data
  updateChartData(
    adminCount: number,
    editorCount: number,
    viewerCount: number
  ) {
    if (this.chart) {
      this.chart.data.datasets[0].data = [adminCount, editorCount, viewerCount];
      this.chart.update(); // Update the chart with new data
    }
  }
}
