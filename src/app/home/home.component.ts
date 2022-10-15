import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(res => {
      const id = res.get('id');
      
      if(id === null){
        document.getElementById(`home`)?.scrollIntoView({behavior: 'smooth'})
      } else {
        document.getElementById(`app-${id}`)?.scrollIntoView({behavior: 'smooth'})
      }

    });
  }

}
