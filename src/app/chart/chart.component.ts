import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  template: `<canvas #chartCanvas></canvas>`,
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Admin', 'Editor', 'Viewer'],
          datasets: [
            {
              label: 'Votes',
              data: [12, 19, 3],
              backgroundColor: ['#383838', '#1c4980', 'yellow'],
            },
          ],
        },
      });
    }
  }
}
