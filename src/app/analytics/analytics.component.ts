import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  public pieChartType: ChartType = 'pie';

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  public barChartLables = ['Day 1','Day 2','Day 3','Day 4']
  public pieChartLables = ['Spotify','Discord','Instagram','Facebook']
  public barChartLegend = true;

  public barChartData = [
    {data: [12,54,35,37], label: 'Views'}
  ]

  public pieChartData = [
    {data: [42,23,62,28], label: 'Socials'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
