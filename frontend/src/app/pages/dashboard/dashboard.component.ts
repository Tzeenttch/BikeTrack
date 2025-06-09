import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { SalesStatistic, StatisticsService } from './statistics.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private statisticsService: StatisticsService) { }


  ngAfterViewInit() {
    this.statisticsService.getTopBrands().subscribe(data => {
      this.createChart('topBrandsChart', data, 'Ventas por Marca');
    });

    this.statisticsService.getMostSoldMotorbikes().subscribe(data => {
      this.createChart('mostSoldChart', data, 'Motocicletas Más Vendidas');
    });

    this.statisticsService.getLeastSoldMotorbikes().subscribe(data => {
      this.createChart('leastSoldChart', data, 'Motocicletas Menos Vendidas');
    });

    this.statisticsService.getMonthlySales().subscribe(data => {
      this.createChart('monthlySalesChart', data, 'Ventas Mensuales');
    });

  }

  createChart(canvasId: string, data: SalesStatistic[], label: string) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    const labels = data.map(d => d.label);
    const counts = data.map(d => d.count);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label,
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
