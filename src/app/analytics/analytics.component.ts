import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  public barChartLables = ['123','456','789']
  public barChartLegend = true;

  public barChartData = [
    {data: [12,54,35], lable: 'Series A'},
    {data: [36,45,75], lable: 'Series B'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
